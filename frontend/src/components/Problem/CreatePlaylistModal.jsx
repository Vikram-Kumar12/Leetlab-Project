import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3
            style={{ fontFamily: "font4" }}
            className="text-xl font-semibold text-[#FFD580]"
          >
            Create New Playlist
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5 text-[#FFD580]" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4"
        >
          <div className="form-control">
            <label className="label">
              <span
                style={{ fontFamily: "font4" }}
                className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1"
              >
                Playlist Name
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              placeholder="Enter playlist name"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control outline-none">
            <label className="label ">
              <span
                style={{ fontFamily: "font4" }}
                className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1"
              >
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 outline-none focus:outline-none focus:ring-0 text-md"
              placeholder="Enter playlist description"
              {...register("description")}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Playlist
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreatePlaylistModal;
