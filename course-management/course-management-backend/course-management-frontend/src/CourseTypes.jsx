import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseTypes() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all course types
  useEffect(() => {
    fetchCourseTypes();
  }, []);

  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/course-types');
      setCourseTypes(response.data);
    } catch (error) {
      console.error('Error fetching course types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`http://localhost:5000/course-types/${editingId}`, { name, course_id: courseId });
      } else {
        // Create
        await axios.post('http://localhost:5000/course-types', { name, course_id: courseId });
      }
      setName('');
      setCourseId('');
      setEditingId(null);
      fetchCourseTypes();
    } catch (error) {
      console.error('Error saving course type:', error);
    }
  };

  const handleEdit = (courseType) => {
    setName(courseType.name);
    setCourseId(courseType.course_id);
    setEditingId(courseType.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/course-types/${id}`);
      fetchCourseTypes();
    } catch (error) {
      console.error('Error deleting course type:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{editingId ? 'Edit Course Type' : 'Add New Course Type'}</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Course Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <h2 className="text-xl mb-2">Course Types List</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Course ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseTypes.map((type) => (
            <tr key={type.id}>
              <td className="border p-2">{type.id}</td>
              <td className="border p-2">{type.name}</td>
              <td className="border p-2">{type.course_id}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(type)} className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(type.id)} className="bg-red-500 text-white px-2 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTypes;
