import {React, useState} from 'react';
import styles from './transferBlockRedux.module.css';
import ComboBox from '../ComboBox';

const TransferBlockRedux = (props) => {
    //console.log("log", props)
    const [selectedAccount1, setSelectedAccount1] = useState("")
    const [selectedCompetency, setCompetency] = useState("")

    const _setSelectedAccount1 = (value, f) => {
        f(value)
        props.updateMethod([value, selectedCompetency])
    }

    const _setCompetency = (value, f) => {
        f(value)
        props.updateMethod([selectedAccount1, value])
    }

    return (
        <div className={styles.block}>
            <ComboBox
                value = {selectedAccount1}
                title = {"Seleccione una billetera"}
                options = {props.accounts}
                method = {(value) => _setSelectedAccount1(value, setSelectedAccount1)}
            />
            <ComboBox
                value = {selectedCompetency}
                title = {"Seleccione una competencia"}
                options = {props.options}
                method = {(value) => _setCompetency(value, setCompetency)}
            />
        </div>
    )
}

export default TransferBlockRedux; 