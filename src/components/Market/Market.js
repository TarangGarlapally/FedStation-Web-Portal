import React, { useEffect, useState } from 'react'
import "./Market.css"
import Modal from 'react-modal';
import { Close } from '@material-ui/icons';
import {getPublishedModels} from '../../ApiCalls'

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: "100%",
        height: "100%",
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    content: {
        position: 'absolute',
        border: '1px solid #ccc',
        inset: "unset",
        background: 'white',
        width: "55%",
        height: "70%",
        padding: "25px",
        overflow: 'none',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '10px',
        outline: 'none',
        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.5)",
        display: 'flex',
        flexDirection: 'column',

    }
};


Modal.setAppElement('#root');


export default function Market() {
    // const { currentUser } = useAuth()

    const [publishedModels, setPublishedModels] = useState([])
    const [publishedModelsLoading, setPublishedModelsLoading] = useState(true)
    const [filteredModels, setFilteredModels] = useState([])
    const [search, setSearch] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false)
    const [selectedModel, setSelectedModel] = useState({})



    useEffect(() => {
        getPublishedModels()
            .then((res) => {
                setPublishedModels(res.data)
                console.log(res)
                setPublishedModelsLoading(false)
            }
            )
            .catch((err) => {
                console.log(err)
            })

        // setPublishedModelsLoading(false)
        // setPublishedModels([
        //     {
        //         id: 1,
        //         name: "Chat Filtering",
        //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nullam euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisi, eget consectetur nisi nisi vel",
        //         contact: "abc@def.com",
        //         createdBy: "ALLO, ALLOCOMPANY",
        //         modelType: "Linear Regression"
        //     },
        //     {
        //         id: 2,
        //         name: "Expense Prediction",
        //         description: "This is a model",
        //         contact: "abc@def.com",
        //         createdBy: "ALLO, ALLOCOMPANY",
        //         modelType: "Linear Regression"
        //     },
        //     {
        //         id: 3,
        //         name: "Image Classification",
        //         description: "This is a model",
        //         contact: "abc@def.com",
        //         createdBy: "ALLO, ALLOCOMPANY",
        //         modelType: "Linear Regression"
        //     }, {
        //         id: 4,
        //         name: "Dining Prediction",
        //         description: "This is a model",
        //         contact: "abc@def.com",
        //         createdBy: "ALLO, ALLOCOMPANY",
        //         modelType: "Linear Regression"
        //     },
        //     {
        //         id: 5,
        //         name: "Keyboard word Prediction",
        //         description: "This is a model",
        //         contact: "abc@def.com",
        //         createdBy: "ALLO, ALLOCOMPANY",
        //         modelType: "Linear Regression"
        //     }
        // ])

    }, [])

    useEffect(() => {
        if (search === "") {
            setFilteredModels(publishedModels)
        } else {

            let filterModels = publishedModels.filter(model => {
                return model.name.toLowerCase().includes(search.toLowerCase())
            })
            setFilteredModels(filterModels)
        }
    }, [publishedModels, search])



    const renderPublishedModels = () => {
        return filteredModels.map((model) => {
            return (
                <tr key={model.id}>
                    <td className="published-model-name">{model.name}</td>
                    <td className="published-model-creator">{model.createdBy}</td>
                    <td className="published-model-model">{model.modelType}</td>
                    <td className="published-model-details">
                        <button onClick={() => { setSelectedModel(model); setIsOpen(true) }}>Details</button>
                    </td>
                </tr>
            )
        })
    }


    return (
        <div className="market-container">
            <div className='market-body'>
                <div className='market-body-header'>
                    <div className='market-body-header-title'>
                        Model Marketplace
                    </div>
                    <div className='market-body-header-subtitle'>
                        Browse and download pre-trained models
                    </div>
                </div>
                <div className='market-body-content'>
                    <div className='market-body-content-search'>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            autoComplete='off'
                            spellCheck='false'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg width="25" height="15" viewBox="9 0 24 24" role="presentation">
                            <path
                                d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                                fill="currentColor"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    {publishedModelsLoading ? (<div>Loading...</div>) : (publishedModels.length === 0 ? (<div style={{marginTop:"20px",fontSize:"20px"}}>No Models Available</div>) : <div className='market-body-content-list'>
                        <table className="table">
                            <thead className="table-project-thead">
                                <tr>
                                    <td className="thead-project-name">Title</td>
                                    <td className="thead-project-owner">Owner</td>
                                    <td className="thead-project-model">Model Type</td>
                                </tr>
                            </thead>
                            <tbody className="table-project-tbody">
                                {renderPublishedModels()}
                            </tbody>
                        </table>
                    </div>)}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setIsOpen(false)}
                        style={customStyles}
                        contentLabel="Publish Modal"
                    >
                        <div className='publish-model'>
                            <div className='publish-model-header'>
                                <div className='publish-model-header-left'>
                                    {selectedModel.name}
                                </div>
                                <div className='publish-model-header-right'>
                                    <Close onClick={() => setIsOpen(false)} className="close-logo" />
                                </div>
                            </div>
                            <div className='publish-model-body'>
                                <div className='publish-model-body-description'>
                                    <div className='publish-model-body-description-title'>
                                        Description
                                    </div>
                                    <div className='publish-model-body-description-content'>
                                        {selectedModel.description}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        DEVELOPED BY:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.createdBy}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        MODEL TYPE:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.modelType}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        CONTACT:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.contact}
                                    </div>
                                </div>
                            </div>
                            <div className='publish-model-footer'>
                                <button className='publish-model-footer-btn'>Download Model</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
