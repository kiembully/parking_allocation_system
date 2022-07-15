import React, { useEffect, useState } from "react";
import style from '../styles/index.module.scss'
// components 
import Lot from '../components/Lot'
import ParkingControl from "../components/controller";

const Home = () => {

    const [controller, states] = ParkingControl()

    const [parkingMap, setParkingMap] = useState([])
    const [vehicleType, setVehicleType] = useState(0)
    const handleVehicleType = (event) => {
        setVehicleType(event.target.value)
        handleDesignation(controller.setParkingSpace(parseInt(event.target.value), parkingMap, entryPoint))
    }
    const [entryPoint, setEntryPoint] = useState(0)
    const handeEntryPoint = (event) => {
        setEntryPoint(event.target.value)
        handleDesignation(controller.setParkingSpace(parseInt(vehicleType), parkingMap, event.target.value))
    }
    const [designation, setDesignation] = useState([])
    const handleDesignation = (data) => {
        if (!!data) {
            setDesignation(`Entrance ${data.entrance}, Slot number ${data.id}`)
        } else {
            setDesignation(`Entrance ${entryPoint} has no available parking space.`)
        }
    }
    
    useEffect(() => {
        setParkingMap(states.parkingMap)
        handleDesignation(controller.setParkingSpace(parseInt(vehicleType), states.parkingMap, entryPoint))
    }, [states.parkingMap])
    
    return (
        <div>
          <h1>Parking Allocation System</h1>
          <div className={style.flex_wrap}>
            <div>
                <h2>Incoming vehicle</h2>
                <div className={style.flex_wrap}>
                    <div>
                        <label>Type</label><br></br>
                        <div>
                            <select value={vehicleType} onChange={handleVehicleType}>
                                <option value="0">small</option>
                                <option value="1">medium</option>
                                <option value="2">large</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>Entry Point:</div>
                        <select value={entryPoint} onChange={handeEntryPoint}>
                            {parkingMap.map((item, id) => {
                                return (
                                    <option key={id} value={item.id}>{item.entrance}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <div>Designation: {designation}</div>
                        <button type="button" onClick={()=>{controller.parkMyVehicle(parkingMap, controller.setParkingSpace(parseInt(vehicleType), parkingMap, entryPoint))}}>Park</button>
                    </div>
                </div>
            </div>
          </div>
          <div className={`${style.flex_wrap} ${style.scrollable}`}>
            {
                parkingMap.map((value, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div>
                                <h3>
                                    <span>{value.entrance}</span>
                                    {index < 3 ? null :
                                    <button type="button" onClick={()=>controller.removeEntrance(parkingMap, index)}>remove</button>
                                    }
                                </h3>
                                {
                                    value.slots.map((val, id) => {
                                        return (
                                            <React.Fragment key={id}>
                                                <Lot 
                                                data={val} 
                                                incoming={controller.setParkingSpace(parseInt(vehicleType), parkingMap, entryPoint)}
                                                unparkCar={controller.unparkMyVehicle}
                                                parkingMap={parkingMap}
                                                updateBilling={controller.updateBilling}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </React.Fragment>
                    )
                })
            }
          </div>
          
          <button type="button" onClick={()=>controller.addEntrance(parkingMap)}>Add Entrance</button>
        </div>
    );
}

export default Home;
