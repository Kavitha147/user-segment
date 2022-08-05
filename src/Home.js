import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Arrow from './assets/arrow.png'

const Root = styled.div`
    width: 100%;
`;

const LeftContainers = styled.div`
    float: left;
    width: 50%;
    height: 955px;
    text-align: center;

    button {
        width: 30%;
        height: 50px;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 30%;
        transform: translate(-75%, -75%);
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
    }
`;

const RightContainers = styled.div`
    float: left;
    width: 50%;
    height: 947px;

    &.openModal {
        background: linear-gradient(to left, white 50%, powderblue 50%) right;
        background-size: 200%;
        transition: 0.5s ease-out;
    }
`;

const Header = styled.div`
    background: #39aebc;
    height: 70px;
    text-align: center;
    color: white;
    h2 {
        font-size: 30px;
    }
`;

const SegmentContainer = styled.div`
    padding: 30px;
    p {
        margin-top: 25px;
        font-size: 20px;
        color: #2a2a2a;
    }
    input {
        width: 80%;
        height: 40px;
        border: 2px solid gray;
        box-shadow: 0px 0px 12px #aaaaaa;
        ::placeholder {
            color: #bec7d3;
            font-size: 16px;
            font-weight: bold;
            padding: 20px;
        }
    }
`;

const DropDownContainer = styled.div`
    padding: 30px;
    select {
        width: 65%;
        height: 50px;
        border: 2px solid gray;
        box-shadow: 0px 0px 12px #aaaaaa;
        background: white;
        padding: 10px;
        font-size: 16px;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: url(${Arrow});
        background-repeat: no-repeat;
        background-position: calc(100% - 3px) center;
        background-size: 22px;
    }
    p {
        margin-top: 30px;
        text-decoration: underline;
        color: #41b494;
        cursor: pointer;
    }
`;

const Footer = styled.div`
    padding: 30px;
    button {
        float: left;
        background-color: #41b494;
        cursor: pointer;
        width: 25%;
        height: 50px;
        border: none;
        margin-right: 20px;
        color: white;
        font-weight: bold;
        font-size: 16px;

        &:hover {
            opacity: 0.7;
        }
    }
`;
const AddedDropDowns = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    select {
        width: 65%;
        height: 50px;
        border: 2px solid gray;
        box-shadow: 0px 0px 12px #aaaaaa;
        background: white;
        padding: 10px;
        font-size: 16px;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: url(${Arrow});
        background-repeat: no-repeat;
        background-position: calc(100% - 3px) center;
        background-size: 22px;
    }
    button {
        background-color: #41b494;
        cursor: pointer;
        width: 20%;
        height: 35px;
        border: none;
        margin-top: 20px;
        color: white;
        font-weight: bold;
        font-size: 16px;
        &:hover {
            opacity: 0.7;
        }
    }
`;


const SaveSegment = () => {
    const dropdownListData = [
        { label: 'Add schema to segment', value: '' },
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]

    const [segmentName, setName] = useState('');
    const [openSegment, setOpenSegment] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState([]);
    const [addNewSegemnt, setNewSegment] = useState([]);
    const [isSelected, setSelected] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [removedIndex, setRemoveIndex] = useState();
    const [dropdownList, setDropdownList] = useState(dropdownListData);
    const [saveSegment, setSaveSegment] = useState(false);

    const labels = [
        { first_name: 'First Name' },
        { last_name: 'Last Name' },
        { gender: 'Gender' },
        { age: 'Age' },
        { account_name: 'Account Name' },
        { city: 'City' },
        { state: 'State' }
    ]

    const handleSelectSegment = (e) => {

        setSelectedSegment((state) => {

            const data = [...state, e.target.value]

            const newList = dropdownList.filter(i => !data.includes(i.value))

            setDropdownList((prevState) => newList
            )
            return data;
        }
        );
        setSelected(true);
    }

    const handleAddSegment = () => {
        if (isSelected) {
            setNewSegment(state => [
                ...state, { selectedSegment, labels }
            ]);
            setSelected(false);
        }
    }

    useEffect(() => {
        if (removed) {
            const res = addNewSegemnt.splice(removedIndex, 1);
            dropdownList.push(res);
            setRemoved(false)
        }
    }, [removed])

    return (
        <Root className='row'>
            <LeftContainers>
                <button onClick={() => setOpenSegment(true)}>Save segment</button>
                {saveSegment && (
                    <div>
                        <p>Segment Name : {segmentName}</p>
                        {addNewSegemnt.map((i, index1) => (
                            <p>{i.selectedSegment} :  {dropdownListData.map((item, index) => (
                                item.value.match(i.selectedSegment[index1]) ? item.label : null
                            ))}</p>

                        ))}
                    </div>
                )}
            </LeftContainers>
            <RightContainers className={openSegment ? 'openModal' : ''}>
                {openSegment &&
                    <>
                        <Header>
                            <h2>Save Segment</h2>
                        </Header>
                        <SegmentContainer>
                            <p>Enter the Name of the Segment</p>
                            <input type='text' placeholder='Name of the segment' onChange={(e) => setName(e.target.value)} required />
                            <p>To save your segment, you need to add the schemas to build the query</p>
                        </SegmentContainer>
                        <AddedDropDowns>
                                {addNewSegemnt.map((i, index1) => (
                                    <>
                                        <select value={i.selectSegment} onChange={(e) => handleSelectSegment(e)}>
                                            <option value={i.selectSegment}>{
                                                dropdownListData.map((item, index) => (
                                                    item.value.match(i.selectedSegment[index1]) ? item.label : null
                                                ))
                                            }
                                            </option>
                                        </select>
                                        <button onClick={
                                            () => {
                                                setRemoved(true)
                                                setRemoveIndex(index1)
                                            }
                                        }>Remove</button>
                                        <br />
                                    </>
                                    

                                )
                                )}
                            </AddedDropDowns>
                        <DropDownContainer>

                            <br /> <br />
                            <select value={selectedSegment} onChange={(e) => handleSelectSegment(e)}>
                                {dropdownList.map((i, index) => (
                                    <>
                                        <option value={i.value} key={index}>{i.label}</option>
                                    </>
                                ))}
                            </select>
                            <p onClick={handleAddSegment}>+Add new schema</p>

                        </DropDownContainer>
                        <Footer>
                            <button onClick={() => setSaveSegment(true)}>Save Segment</button>
                            <button onClick={() => setOpenSegment(false)}>cancel</button>
                        </Footer>
                    </>
                }
            </RightContainers>
        </Root>
    )
}
export default SaveSegment;