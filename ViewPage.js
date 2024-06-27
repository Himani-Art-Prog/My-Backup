import React, { useState, useEffect } from 'react';
import '../../Style/NavbarStyle.css';

const SecondPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const companiesPerPage = 10;
  const [formData, setFormData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(storedFormData);
  }, []);

  // Logic to calculate pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  // Filtered and paginated companies
  const filteredCompanies = formData.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when search term changes
  };

  // Handle modal open for editing
  const handleEditClick = (company) => {
    setSelectedCompany({ ...company }); // Create a copy of the company to avoid direct state mutation
    setShowModal(true);
  };

  // Handle modal close for editing
  const handleClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  // Handle modal close for viewing
  const handleCloseViewModal = () => {
    setViewModal(false);
    setSelectedCompany(null);
  };

  // Handle input changes in modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedCompany(prevCompany => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  // Handle save changes in modal
  const handleSave = () => {
    const updatedFormData = formData.map(company =>
      company.id === selectedCompany.id ? selectedCompany : company
    );
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    handleClose();
  };

  // Handle delete company
  const handleDelete = (companyId) => {
    const updatedFormData = formData.filter(company => company.id !== companyId);
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  // Handle view company
  const handleViewClick = (company) => {
    setSelectedCompany(company);
    setViewModal(true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="City"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Country"
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-12">
          <h3 className="text-center">Company List</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Company ID</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">GST Number</th>
                <th scope="col">Created Date</th>
                <th scope="col">Created By</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.map(company => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.companyName}</td>
                  <td>{company.contactNumber}</td>
                  <td>{company.gstNumber}</td>
                  <td>{company.createdDate}</td>
                  <td>{company.createdBy}</td>
                  <td>
                    <button className="btn btn-sm btn-primary m-1" onClick={() => handleEditClick(company)}>Edit</button>
                    <button className="btn btn-sm btn-danger m-1" onClick={() => handleDelete(company.id)}>Delete</button>
                    <button className="btn btn-sm btn-success m-1" onClick={() => handleViewClick(company)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div className="modal-backdrop">
              <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Company</h5>
                      <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          value={selectedCompany.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="contactNumber"
                          name="contactNumber"
                          value={selectedCompany.contactNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gstNumber">GST Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gstNumber"
                          name="gstNumber"
                          value={selectedCompany.gstNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="createdDate">Created Date</label>
                        <input
                          type="text"
                          className="form-control"
                          id="createdDate"
                          name="createdDate"
                          value={selectedCompany.createdDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="createdBy">Created By</label>
                        <input
                          type="text"
                          className="form-control"
                          id="createdBy"
                          name="createdBy"
                          value={selectedCompany.createdBy}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                      <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewModal && (
            <div className="modal-backdrop">
              <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">View Company</h5>
                      <button type="button" className="close" onClick={handleCloseViewModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <p><strong>Company Id:</strong> {selectedCompany.id}</p>
                      <p><strong>Company Name:</strong> {selectedCompany.companyName}</p>
                      <p><strong>Email:</strong> {selectedCompany.email}</p>
                      <p><strong>Address:</strong> {selectedCompany.address}</p>
                      <p><strong>City:</strong> {selectedCompany.city}</p>
                      <p><strong>State:</strong> {selectedCompany.state}</p>
                      <p><strong>Country:</strong> {selectedCompany.country}</p>
                      <p><strong>Zip:</strong> {selectedCompany.zip}</p>
                      <p><strong>Contact Number:</strong> {selectedCompany.contactNumber}</p>
                      <p><strong>GST Number:</strong> {selectedCompany.gstNumber}</p>
                      <p><strong>Subscription:</strong> {selectedCompany.subcription}</p>
                      <p><strong>Created Date:</strong> {selectedCompany.createdDate}</p>
                      <p><strong>Created By:</strong> {selectedCompany.createdBy}</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCloseViewModal}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredCompanies.length / companiesPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
