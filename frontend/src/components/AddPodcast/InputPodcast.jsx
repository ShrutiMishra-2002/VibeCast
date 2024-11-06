import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AddPodcast from '../../pages/AddPodcast';
import YourPodcasts from '../Profile/YourPodcasts';

import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
const InputPodcast = () => {
    const [frontImage,setfrontImage] = useState(null);
    const [audioFile,setaudioFile] = useState(null);
    const [Dragging,setDragging] = useState(false);
    const [Inputs, setInputs] = useState({title:"", description:"", category:"", });
    const handleChangeImage = (e) =>{
        e.preventDefault();
        const file = e.target.files[0];
        setfrontImage(file);
    };
    const handleDragEnter = (e)=>{
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = (e) =>{
      e.preventDefault();
      setDragging(false);
    };
    const handleDragOver = (e) =>{
        e.preventDefault();
        // setDragging(false);
    };
    const handleDropImage = (e) =>{
        console.log("Dropped");
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfers.files[0];
        setfrontImage(file);

    };
    const handleAudioFile = (e) =>{
        e.preventDefault();
        const file = e.target.files[0];
        setaudioFile(file);
    };
    const onChangeInputs = (e) =>{
      const {name, value} = e.target;
      setInputs({...Inputs,[name]:value});
    };
    const handleSubmitPodcast = async() =>{
      console.log(Inputs,frontImage,audioFile);
      const data = new FormData();
      data.append("title", Inputs.title); 
      data.append("description", Inputs.description); 
      data.append("category", Inputs.category); 
      data.append("frontImage", frontImage); 
      data.append("audioFile", audioFile); 
      try{
        const res = await axios.post("http://localhost:1000/api/v1/add-podcasts",
          data, 
          {
            headers:{
              "Content-Type":"multipart/form-data",
            },
            withCredentials:true,
          }
        );
        toast.success(res.data.message);
       } catch (error){
        toast.error(error.response.data.message);
      }
      finally{
        setInputs({
          title:"",
          description:"",
          category:"",
        });
        setfrontImage(null);
        setaudioFile(null);
      }
    };
    // console.log(audioFile);
  return (
    <div className="my-4 px-4 md:px-8 lg:px-12">
      <ToastContainer />
      <h1 className="text-2xl font-semibold text-center lg:text-left">Create your podcast</h1>

      <div className="mt-5 flex flex-col lg:flex-row lg:items-start items-center justify-between gap-6">
        
        {/* Thumbnail Upload */}
        <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-start">
          <div 
            className="w-[70%] h-[25vh] md:h-[35vh] lg:w-[100%] lg:h-[60vh] flex items-center justify-center hover:bg-slate-50 transition-all duration-300" 
            style={{border: "1px dashed black"}}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropImage}
          >
            <input type="file" accept="image/*" id="file" name="frontImage" className="hidden" onChange={handleChangeImage} />
            {frontImage ? (<img src={URL.createObjectURL(frontImage)} alt="thumbnail" className="h-[100%] w-[100%] object-cover" /> ): 
            (
            <> 
            <label 
              htmlFor="file" 
              className={`text-xl p-4 h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${Dragging ? "bg-blue-200" : ""} hover:bg-zinc-200 transition-all duration-300`} 

              >
              <div className="text-center">
                Drag and Drop the thumbnail or Click to browse
              </div>
            </label>
            </>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Title Input */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-medium">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="Title for your podcast" 
              className="mt-2 px-4 py-2 border border-zinc-800 rounded outline-none w-full"
              value={Inputs.title}
              onChange={onChangeInputs}
            />
          </div>
          
          {/* Description Input */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-medium">Description</label>
            <textarea 
              id="description" 
              name="description" 
              placeholder="Description for your podcast" 
              className="mt-2 px-4 py-2 border border-zinc-800 rounded outline-none w-full" 
              rows={4}
              value={Inputs.description}
              onChange={onChangeInputs}
            />
          </div>

          {/* Audio and Category Selection */}
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Audio Upload */}
            <div className="flex flex-col w-full lg:w-1/2">
              <label htmlFor="audioFile" className="text-lg font-medium">Select Audio</label>
              <input 
                type="file" 
                accept=".mp3, .wav, .m4a, .ogg" 
                id="audioFile" 
                className="mt-2"
                onChange= {handleAudioFile}
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col w-full lg:w-1/2">
              <label htmlFor="category" className="text-lg font-medium">Select Category</label>
              <select 
                name="category" 
                id="category" 
                className="border border-zinc-900 rounded mt-2 outline-none px-4 py-2 w-full"
                value={Inputs.category}
                onChange= {onChangeInputs}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button 
              className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300"
              onClick={handleSubmitPodcast}
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
