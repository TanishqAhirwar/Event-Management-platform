import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstence from "../webservice/instance";
import { Urls } from "../webservice/allapis";
import { toast } from "react-toastify";

export default function Eventform() {
  const [thumbnail, SetThumnail] = useState("")
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  async function Submit(data) {
    if (!thumbnail) {
      return alert("Please Upload Event Thumbnail")
    }

    const formData = new FormData()

    for (let key in data) {
      formData.append(key, data[key])
    }

    formData.append('thumbnail',thumbnail)

    try {
      let { data } = await axiosInstence().post(Urls.CREATE_EVENT, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (!data.status) {
        return toast.error(data.message?.includes("E11000") ? "This Date Already Created An Event" : data.message)
      }

      toast.success(data.message)
      reset()
      SetThumnail("")

    } catch (error) {
      console.log(error);
    }


  }

  return (<>
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
          Create New Event
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(Submit)}>

          {/* Event Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Event Thumbnail
            </label>
            <input
              type="file"
              placeholder="Enter event title"
              onChange={(e) => { SetThumnail(e.target.files[0]) }}
              className="cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            // {...register('thumbnail', { required: "thumbnail is Required" })}
            />
            <img className="w-full border border-gray-300 mt-2" src={thumbnail && URL.createObjectURL(thumbnail)} alt="preview Image" />
          </div>


          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Enter event title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('title', { required: "title is Required" })}
            />
            {errors.title && <p className="text-red-500">{errors?.title?.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the event"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('description', { required: "description is Required" })}
            ></textarea>
            {errors.description && <p className="text-red-500">{errors?.description?.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                {...register('date', { required: "date is Required" })}
              />
              {errors.date && <p className="text-red-500">{errors?.date?.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                {...register('time', { required: "time is Required" })}
              />
              {errors.time && <p className="text-red-500">{errors?.time?.message}</p>}
            </div>
          </div>


          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Event location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('location', { required: "location is Required" })}
            />
            {errors.location && <p className="text-red-500">{errors?.location?.message}</p>}
          </div>

          {/* Available Slots */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Available Slots
            </label>
            <input
              type="number"
              placeholder="Enter number of slots"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('available_slots', { required: "available_slots is Required" })}
            />
            {errors.available_slots && <p className="text-red-500">{errors?.available_slots?.message}</p>}
          </div>

          {/* Available Slots */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Per Slot Price
            </label>
            <input
              type="number"
              placeholder="Per Slot Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('price', { required: "price is Required" })}
            />
            {errors.price && <p className="text-red-500">{errors?.price?.message}</p>}
          </div>


          {/* Event Category */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Event Category
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register('event_category', { required: "event_category is Required" })}
            >
              <option value="">Select a category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Celebration">Celebration</option>
            </select>
            {errors.event_category && <p className="text-red-500">{errors?.event_category?.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
}
