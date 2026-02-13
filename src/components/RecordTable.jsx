import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import RecordModel from "./RecordModel";
import {
  deleteRecord,
  setSearchTerm,
  selectAllRecords,
  selectSearchTerm,
  selsectFilteredRecords,
} from "../store/recordSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const RecordTable = () => {
  const dispatch = useDispatch();

  const filteredRecords = useSelector(selsectFilteredRecords);
  const allRecords = useSelector(selectAllRecords);
  const searchTerm = useSelector(selectSearchTerm);

  const storedRecords = [...filteredRecords.sort((a, b) => b.id - a.id)];

  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openCreateModal = () => {
    setCurrentRecord(null);
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record) => {
    dispatch(deleteRecord(record))

  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Employee Management
          </h1>
          <p className="text-gray-600">
            {""}
            Manage Employee records with Redux Toolkit.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                placeholder="Search by name, email, or position"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={20} className="mr-2" />
              Add Employee
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Id
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/*conditional rendering for no records*/}

                {storedRecords.length === 0 ? (
                  <tr className="py-3 px-4 text-center text-sm text-gray-700">
                    <td colSpan={6}>No records found</td>
                  </tr>
                ) : (
                  storedRecords.map((record) => {
                    return (
                      <tr className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          {record.id}
                        </td>
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          {record.name}
                        </td>
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          {record.email}
                        </td>
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          {record.phone}
                        </td>
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          {record.position}
                        </td>
                        <td className="py-3 px-4 text-sm whitespace-nowrap text-gray-900">
                          <div className="flex items-center justify-center">
                            <button onClick={()=>openEditModal(record)} className="text-white bg-blue-500 rounded flex items-center font-medium text-sm hover:bg-blue-900 transition-colors duration-150 mr-2 px-3 py-1 rounded">
                              <Edit2 size={16} className="mr-1" />
                              Edit
                            </button>
                            <button onClick={()=> handleDelete(record.id)} className="text-white bg-red-500 rounded flex items-center font-medium text-sm hover:bg-red-900 transition-colors duration-150 mr-2 px-3 py-1 rounded">
                              <Trash2 size={16} className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}

                {/*map through records and display them in the table*/}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing {storedRecords.length} of {allRecords.length} records.</p>
          </div>
        </div>
      </div>
      <RecordModel isOpen={showModal} onClose={closeModal} currentRecord={currentRecord}/>
    </div>
  );
};
export default RecordTable;
