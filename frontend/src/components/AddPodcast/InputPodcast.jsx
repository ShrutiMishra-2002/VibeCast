import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const InputPodcast = () => {
  const [frontImage, setfrontImage] = useState(null);
  const [audioFile, setaudioFile] = useState(null);
  const [Dragging, setDragging] = useState(false);
  const [Inputs, setInputs] = useState({ title: "", description: "", category: "" });

  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setfrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  
  const handleDropImage = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setfrontImage(file);
  };

  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setaudioFile(file);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleSubmitPodcast = async () => {
    const data = new FormData();
    data.append("title", Inputs.title);
    data.append("description", Inputs.description);
    data.append("category", Inputs.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);

    try {
      const res = await axios.post(`https://vibecast-v9sc.onrender.com/api/v1/add-podcasts`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setInputs({ title: "", description: "", category: "" });
      setfrontImage(null);
      setaudioFile(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Your Podcast</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Thumbnail Upload */}
          <div className="w-full lg:w-1/3">
            <label className="block text-lg font-medium mb-2">Thumbnail</label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer transition-colors ${
                Dragging ? 'border-[#4C4B5F] bg-[#4C4B5F]' : 'border-gray-300 bg-gray-100'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDropImage}
              onDragOver={(e) => e.preventDefault()}
            >
              <input type="file" accept="image/*" id="file" className="hidden" onChange={handleChangeImage} />
              {frontImage ? (
                <img src={URL.createObjectURL(frontImage)} alt="thumbnail" className="h-40 w-40 object-cover rounded-lg" />
              ) : (
                <label htmlFor="file" className="text-gray-500 text-center">
                  Drag & Drop or Click to Upload
                </label>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-lg font-medium">Title</label>
              <input 
                type="text"
                id="title"
                name="title"
                placeholder="Enter podcast title"
                className="mt-2 w-full p-3 border rounded-lg outline-none focus:border-[#4C4B5F]"
                value={Inputs.title}
                onChange={onChangeInputs}
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter podcast description"
                rows={4}
                className="mt-2 w-full p-3 border rounded-lg outline-none focus:border-[#4C4B5F]"
                value={Inputs.description}
                onChange={onChangeInputs}
              />
            </div>

            {/* Audio Upload */}
            <div className="flex flex-col">
              <label htmlFor="audioFile" className="text-lg font-medium">Select Audio</label>
              <label 
                htmlFor="audioFile" 
                className="w-full block bg-[#4C4B5F] text-white text-center py-2 rounded-lg cursor-pointer hover:bg-[#2F2E41] transition-all"
              >
                {audioFile ? `Selected: ${audioFile.name}` : "Choose Audio File"}
              </label>
              <input 
                type="file"
                accept=".mp3, .wav, .m4a, .ogg"
                id="audioFile"
                className="hidden"
                onChange={handleAudioFile}
              />
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-lg font-medium">Select Category</label>
              <select
                id="category"
                name="category"
                className="mt-2 w-full p-3 border rounded-lg outline-none focus:border-[#4C4B5F]"
                value={Inputs.category}
                onChange={onChangeInputs}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                {/* Not working Hobbies */}
                {/* <option value="Hobbies">Hobbies</option>  */}
                <option value="Government">Government</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitPodcast}
              className="w-full mx-auto bg-[#4C4B5F] text-white py-3 rounded-lg hover:bg-[#2F2E41] transition-all"
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
