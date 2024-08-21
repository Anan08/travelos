'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface dataProps {
  id: string;
  title: string;
  desc: string;
  prices: number;
}


const EditModal = ({ packageData, onClose, onSave }: { packageData: dataProps, onClose: () => void, onSave : () => void}) => {
  const [formData, setFormData] = useState(packageData);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Edit Package</h2>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Price:
          <input
            type="number"
            name="prices"
            value={formData.prices}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Status:
          <input
            type="number"
            name="prices"
            value={formData.prices}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <button onClick={handleSave} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};



export default function Page() {
  const router = useRouter()
  const [packages, setPackages] = useState<dataProps[]>([]);
  const [modal, setModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<dataProps | null | undefined>(null)
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();


  useEffect(() => {
      
    fetch('/api/package', {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        setPackages(data)
        console.log(data)}
      )
  }, [])

  const handleDelete = (id : string) => {
    if (confirm('delete the item?')) {
        fetch(`/api/package?id=${id}`, {
          method: 'DELETE'
      })
      alert('successfully deleted the item')
      router.push('/pages/dashboard/admin/packages')
      
    } else {
      return
    }
    
  };

  const handleEdit = (id : string) => {
    const packageToEdit = packages.find((pkg) => pkg.id == id);
    setSelectedPackage(packageToEdit)
    setModal(true);
  };

  return (
    <div>
      {modal && selectedPackage && (
        <EditModal
          packageData={selectedPackage}
          onClose={() => setModal(false)}
          onSave={() => {}}
        />
      )}
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Package List</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">This will be used for CRUD function on package data</p>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 mb-10"> Package list</h2>
          <div className="p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Prices</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{pkg.title}</td>
                    <td className="py-2 px-4">${pkg.prices}</td>
                    <td className="py-2 px-4">
                      <button
                          className="mr-2 px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded"
                          onClick={() => handleEdit(pkg.id)}
                          type='submit'
                        >
                          Edit
                      </button>
                      <button
                          className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
