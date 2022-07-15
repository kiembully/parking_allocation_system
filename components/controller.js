import { useState } from "react"
import Swal from "sweetalert2"

const parking_db = [
    {
        id: 0,
        entrance: "Entrance 0",
        slots: [
            {id: 0, is_vacant: true, size: 0, occupant: 0, time_in: 0, duration: 0, entrance: 0, bill: 0},
            {id: 1, is_vacant: true, size: 1, occupant: 0, time_in: 0, duration: 0, entrance: 0, bill: 0},
            {id: 2, is_vacant: true, size: 2, occupant: 0, time_in: 0, duration: 0, entrance: 0, bill: 0},
        ]
    },
    {
        id: 1,
        entrance: "Entrance 1",
        slots: [
            {id: 0, is_vacant: true, size: 0, occupant: 0, time_in: 0, duration: 0, entrance: 1, bill: 0},
            {id: 1, is_vacant: true, size: 1, occupant: 0, time_in: 0, duration: 0, entrance: 1, bill: 0},
            {id: 2, is_vacant: true, size: 2, occupant: 0, time_in: 0, duration: 0, entrance: 1, bill: 0},
        ]
    },
    {
        id: 2,
        entrance: "Entrance 2",
        slots: [
            {id: 0, is_vacant: true, size: 0, occupant: 0, time_in: 0, duration: 0, entrance: 2, bill: 0},
            {id: 1, is_vacant: true, size: 1, occupant: 0, time_in: 0, duration: 0, entrance: 2, bill: 0},
            {id: 2, is_vacant: true, size: 2, occupant: 0, time_in: 0, duration: 0, entrance: 2, bill: 0},
        ]
    }
]

const ParkingControl = () => {

    // created a mock database with its default values
    const [parkingMap, setParkingMap] = useState(parking_db)

    // add new entrance
    const addEntrance = (data) => {
        const arr = data
        const new_arr = arr.concat(
            {
                id: data.length,
                entrance: `Entrance ${data.length}`,
                slots: [
                    {id: 0, is_vacant: true, size: 0, occupant: 0, time_in: 0, duration: 0, entrance: data.length, bill: 0},
                    {id: 1, is_vacant: true, size: 1, occupant: 0, time_in: 0, duration: 0, entrance: data.length, bill: 0},
                    {id: 2, is_vacant: true, size: 2, occupant: 0, time_in: 0, duration: 0, entrance: data.length, bill: 0},
                ], 
            }
        )
        setParkingMap(new_arr)
    }

    // remove entrance 
    const removeEntrance = (data, id) => {
        const arr = data
        const new_arr = arr.filter((object, index) => {
            return index !== parseInt(id)
        })
        setParkingMap(new_arr)
    }
    
    // set nearest parking slots 
    const setParkingSpace = (type, slots, entryPoint) => {
        const arr = slots
        // find all available slots
        const availableSlots = arr.map((object) => {
            if (object.id === parseInt(entryPoint)) {
                return object.slots.find((item) => {
                    switch(type) {
                        case 0: return item.is_vacant
                        case 1: return item.is_vacant && item.size > 0
                        case 2: return item.is_vacant && item.size > 1
                    }
                })
            }
        })
        return getParkingSlot(availableSlots)
    }

    // get nearest appropriate parking slot 
    const getParkingSlot = (slots) => {
        const arr = slots
        const slot = arr.find(item => {
            return item !== undefined
        })
        return slot
    }

    // park car
    const parkMyVehicle = (slots, selectedSlot) => {
        const arr = slots;

        if (!selectedSlot) {
            return false
        }
        
        const new_arr = arr.map((obj)=>{
            if (obj.id === selectedSlot.entrance) {
                return {...obj, slots: (
                    obj.slots.map(slot => {
                        if (slot.id === selectedSlot.id) {
                            return {...slot, is_vacant: false, time_in: Date.now(), bill: 40}
                        }
                        return slot
                    })
                )}
            }
            return obj
        })
        setParkingMap(new_arr)
    }
    
    // unpark car
    const unparkMyVehicle = (slots, selectedSlot) => {
        const arr = slots;

        if (!selectedSlot) {
            return false
        }
        
        Swal.fire({
            icon: 'info',
            title: `Entrance ${selectedSlot.entrance}, Slot #${selectedSlot.id}'s Invoice!`,
            html: `<span>You have to pay PHP${selectedSlot.bill}!</span>`,
            confirmButtonText: 'Ok',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                const new_arr = arr.map((obj)=>{
                    if (obj.id === selectedSlot.entrance) {
                        return {...obj, slots: (
                            obj.slots.map(slot => {
                                if (slot.id === selectedSlot.id) {
                                    return {...slot, is_vacant: true, time_in: 0, bill: 0}
                                }
                                return slot
                            })
                        )}
                    }
                    return obj
                })
                setParkingMap(new_arr)
            }
          })
    }

    const updateBilling = (slots, selectedSlot, timeIn) => {
        const arr = slots
        // calculate billing 
        const time = Date.parse(new Date()) - Date.parse(timeIn);
        if (time < 0) {
        //   this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const seconds = Math.floor((time / 1000) % 60);
          const minutes = Math.floor((time / 1000 / 60) % 60);
          const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
          const days = Math.floor(time / (1000 * 60 * 60 * 24));

          const new_arr = arr.map((obj)=>{
            if (obj.id === selectedSlot.entrance) {
                return {...obj, slots: (
                    obj.slots.map(slot => {
                        if (slot.id === selectedSlot.id) {
                            return {...slot, bill: calculateBills(seconds,minutes,hours,days,selectedSlot.id)}
                        }
                        return slot
                    })
                )}
            }
            return obj
        })
        setParkingMap(new_arr)
        }
        // console.log(slots, selectedSlot, timeIn)
    }

    const calculateBills = (seconds,minutes,hours,days,type) => {
        if (days > 0) {
            switch(type) {
                case 0: return ((hours*20) + (days*5000))
                case 1: return ((hours*60) + (days*5000))
                case 2: return ((hours*100) + (days*5000))
            }
        } else {
            if (hours > 3) {
                switch(type) {
                    case 0: return 40 + ((hours-3)*20)
                    case 1: return 40 + ((hours-3)*60)
                    case 2: return 40 + ((hours-3)*100)
                }
            } else {
                return 40
            }
        }
    }
    
    const controller = {
        setParkingMap: setParkingMap,
        addEntrance:addEntrance,
        removeEntrance:removeEntrance,
        setParkingSpace:setParkingSpace,
        parkMyVehicle:parkMyVehicle,
        unparkMyVehicle:unparkMyVehicle,
        updateBilling:updateBilling
    }
    const states = {
        parkingMap: parkingMap
    }
    
    return [controller, states];
}

export default ParkingControl;