import React from 'react';
import ChartRow from './ChartRow';

let tableRowsData = [
    {
        Name: 'Tiger Nixon',
        Description: 'System Architect',
        Price: '$320,800',
        Categories: ['Category 01','Category 02','Category 03'],
        Colors: ['Red','Blue','Green'],
        Stock: 245
    },
    {
        Name: 'Jane Doe',
        Description: 'Fullstack developer',
        Price: '$320,800',
        Categories: ['Category 01','Category 02','Category 03'],
        Colors: ['Red','Blue','Green'],
        Stock: 245
    },
    
]


function Chart (){
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Categories</th>
                                <th>Colors</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Categories</th>
                                <th>Colors</th>
                                <th>Stock</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;