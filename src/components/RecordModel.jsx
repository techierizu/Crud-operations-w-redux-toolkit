import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {updateRecord, addRecord} from "../store/recordSlice"

const RecordModel = ({ isOpen, onClose, currentRecord }) => {
  const dispatch = useDispatch();

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    if (currentRecord) {
      setFormData({
        name: currentRecord.name,
        email: currentRecord.email,
        phone: currentRecord.phone,
        position: currentRecord.position,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
      });
    }
  }, [currentRecord]);

  const handleSubmit = ()=>{
    if(!formdata.name.trim() || !formdata.email.trim() || !formdata.phone.trim() || !formdata.position.trim()){
        alert("Please provide all details to register")
        return
    }

    if(currentRecord){
        dispatch(updateRecord({id: currentRecord.id, data: formdata}))
    } else {
        dispatch(addRecord(formdata))
    }
    onClose()
  }

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>
          <button className="text-gray-400 hover:text-gray-600 transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formdata.name}
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              value={formdata.phone}
              onChange={(e) =>
                setFormData({ ...formdata, phone: e.target.value })
              }
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={formdata.position}
              onChange={(e) =>
                setFormData({ ...formdata, position: e.target.value })
              }
              placeholder="Enter position"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
            {currentRecord ? "Edit" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModel;
