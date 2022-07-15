import style from '../styles/Lot.module.scss';
import Count from './Timer/Count';

const Lot = (props) => {

    const isIncoming = () => {
        if (!!props.incoming) {
            return (props.data.id === props.incoming.id && props.data.entrance === props.incoming.entrance)
        } else {
            return false
        }
    }

    const setSize = (size) => {
        switch (size) {
            case 0: return 'Small'
            case 1: return 'Medium'
            case 2: return 'Large'
        }
    }

    const setDuration = (data) => {
        var date = new Date(data);
        
        if (data === 0) {
            return 0;
        } else {
            return <Count data={props} date={date} />;
        }
    }

    const formatTimestamp = (date) => {
        if (date === 0) {
            return 0
        } else {
            var timestamp = date
            var new_date = new Date(timestamp);
            return new_date.toLocaleString()
        }
    }
    
    return (
        <div className={`${style.lotWrap} ${props.data.is_vacant ? '' : style.occupied} ${isIncoming() ? style.incoming : ''}`}>
            <span>
                <h4>Slot #{props.data.id}</h4>
            </span>
            <span>
                <div>
                    <span>
                        <p>Vacant:</p>
                        <p>Size:</p>
                        <p>Occupant:</p>
                        <p>Time In:</p>
                        <p>Time Elapsed:</p>
                        <p>Bill:</p>
                    </span>
                    <span>
                        <p>{props.data.is_vacant ? 'True' : 'False'}</p>
                        <p>{setSize(props.data.size)}</p>
                        <p>{props.data.occupant}</p>
                        <p>{formatTimestamp(props.data.time_in)}</p>
                        <p>{setDuration(props.data.time_in)}</p>
                        <p>PHP {props.data.bill}</p>
                    </span>
                </div>
            </span>
            <span>
                {props.data.is_vacant ? null :
                <button type="button" onClick={() => {props.unparkCar(props.parkingMap, props.data)}}>Unpark</button>
                }
            </span>
        </div>
    );
}

export default Lot;