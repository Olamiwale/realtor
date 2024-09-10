import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    parking: false,
    furnished: false,
    address: "",
    description: "",
    images: {},
  });
  const {
    type,
    name,
    parking,
    address,
    furnished,
    description,
    price,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({ ...prevState, images: e.target.files }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
   
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
   

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
  
   
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>

      <form onSubmit={onSubmit}>
        <p className="text-[20px] flex uppercase justify-center mt-[50px] font-bold pb-6">
          Sell / Rent
        </p>

        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`listing-btn ${
              type === "rent" ? "text-black" : "bg-slate-600"
            }`}
          >
            sell
          </button>

          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`listing-btn ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            rent
          </button>
        </div>

        {/*Details */}

        <div>
          <div>
            <p className="text-lg mt-6 font-semibold">Name</p>

            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="40"
              minLength="10"
              required
              className="listing-input"
            />
          </div>

          <div>
            <p className="text-lg mt-6 font-semibold">Address</p>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="listing-textarea"
            />
          </div>

          <div>
            <p className="text-lg font-semibold">Description</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="listing-input"
            />
          </div>
        </div>

        <div className="flex space-x-6 mb-6"></div>

        <div className="flex justify-between">
          <div>
            <p className="text-lg mt- py-4 font-semibold">Parking spot</p>
          </div>

          <div className="flex space-x-10">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`listing-btn ${
                !parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}>
              Yes
            </button>

            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`listing-btn ${
                parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}>

              no
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <div>
            <p className="text-lg mt- py-4 font-semibold">Furnished</p>
          </div>

          <div className="flex space-x-10">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`listing-btn ${
                !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}>
              yes
            </button>

            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={`listing-btn ${
                furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}>
              no
            </button>
          </div>
        </div>

        <div className="bg-green-100 py-5 flex justify-between items-center   my-8">
          <div>
            <p className="text-lg font-semibold">
              {type === "sale" ? "Sale Price" : "Rent Price / month"}
            </p>
          </div>

          <input
            type="number"
            className="p-2 flex text-center"
            id="regularPrice"
            value={price}
            onChange={onChange}
            min="50"
            max="5000000"
            required
          />
        </div>

        <div className="mb-6">
          <p className="flex justify-center text-[15px] font-semibold">
            Images
          </p>
          <p className="text-gray-600 py-4"> Upload min of 3 and max 6 image</p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="listing-input"
          />
        </div>

        <button type="submit" className="create-btn">
          Create Listing
        </button>
      </form>
    </main>
  );
}


