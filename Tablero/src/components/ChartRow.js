import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.Name}</td>
                    <td>{props.Description}</td>
                    <td>{props.Price}</td>
                    <td>
                        <ul>
                            {props.Categories.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li><span className="text-danger">{props.Colors[0]}</span></li>
                            <li><span className="text-primary">{props.Colors[1]}</span></li>
                            <li><span className="text-success">{props.Colors[2]}</span></li>
                        </ul>
                    </td>
                    <td>{props.Stock}</td>
                </tr>
            )
    }
    
        

export default ChartRow;