import React from 'react';

const UserPanel = () => {
    return (
        <div className='userPanel-container py-3'>
            <section>
                <div className='container mb-3'>
                    <div className='row justify-content-center'>
                        <div className='col-11 col-md-5 border-orange px-2 py-1 rounded-3'>
                            <div className='row'>
                                <div className='col-7'>
                                    <h4 className='fw-bold'>Membership: Diamond</h4>
                                </div>
                                <div className='col-5'>
                                    <h4 className='mb-0 fw-bold'>Bush: 4</h4>
                                    <h4 className='mt-0 fw-bold'>Diamond: 1</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container mb-5'>
                    <h4 className='mb-5 fw-bold'>Username: </h4>
                    <div className='row'>
                        <div className='col-5'>
                            <h4 className='mb-0 fw-bold'>Word: </h4>
                            <h4 className='mb-0 mt-0 fw-bold'>Line2: </h4>
                            <h4 className='mb-0 mt-0 fw-bold'>Symbol: </h4>
                            <h4 className='mb-0 mt-0 fw-bold'>Days: </h4>
                        </div>
                        <div className='col-7'>
                            <h4 className='mb-5 fw-bold'>Redirect: </h4>
                            <div>
                                <button className='btn btn-list-items'>List Button</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section>
                <div className='container mb-5'>
                    <div className='row'>
                        <h4 className='text-orange mb-3'>Past Listed: </h4>
                        <table className="table-bordered border-orange text-center mx-3">
                            <tbody>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-danger'>Pending</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-danger'>Pending</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-danger'>Pending</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50  text-danger'>Pending</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='row'>
                        <h4 className='mb-3 fw-bold'>Approved Active Listings: </h4>
                        <table className="table-bordered border-orange text-center mx-3">
                            <tbody>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-success'>Approved</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-success'>Approved</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-success'>Approved</td>
                                </tr>
                                <tr>
                                    <td className='w-50'>Yes</td>
                                    <td className='w-50 text-success'>Approved</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserPanel;