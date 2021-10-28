import {React, useState} from 'react';
import styles from './transferBlock.module.css';
import ComboBox from '../ComboBox';

const TransferBlock = (props) => {
    //console.log("log", props)
    const [selectedAccount1, setSelectedAccount1] = useState("")
    const [selectedAccount2, setSelectedAccount2] = useState("")
    const [selectedCompetency, setCompetency] = useState("")

    const _setSelectedAccount1 = (value, f) => {
        f(value)
        props.updateMethod([value, selectedAccount2, selectedCompetency])
    }

    const _setSelectedAccount2 = (value, f) => {
        f(value)
        props.updateMethod([selectedAccount1, value, selectedCompetency])
    }

    const _setCompetency = (value, f) => {
        f(value)
        props.updateMethod([selectedAccount1, selectedAccount2, value])
    }

    return (
        <div className={styles.block}>
            <ComboBox
                value = {selectedAccount1}
                title = {"Seleccione el emisor"}
                options = {props.accounts}
                method = {(value) => _setSelectedAccount1(value, setSelectedAccount1)}
            />
            <ComboBox
                value = {selectedAccount2}
                title = {"Seleccione el receptor"}
                options = {props.accounts}
                method = {(value) => _setSelectedAccount2(value, setSelectedAccount2)}
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

export default TransferBlock; 