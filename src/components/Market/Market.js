import React, { useEffect, useState } from 'react'
import "./Market.css"
import Modal from 'react-modal';
import { Close } from '@material-ui/icons';
import { getPublishedModels } from '../../ApiCalls'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FileCopyOutlined, AssignmentOutlined } from '@material-ui/icons'
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    const [isCopied, setIsCopied] = useState(false);
    const [apiPath, setApiPath] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null)
    const [downUrl, setDownUrl] = useState({})
    const params = useParams();



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

    useEffect(() => {
        if(selectedModel){
            axios.get("https://fedstation-ml-service.herokuapp.com/downloadGlobalModelURL/" + selectedModel.id)
                .then((data) => {
                    setDownUrl(data.data.response)
                    console.log(downUrl)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }, [selectedModel])

    async function downloadModel(){
        var link = document.createElement("a");

        link.href = downUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const renderPublishedModels = () => {
        return filteredModels.map((model) => {
            return (
                <tr key={model.id}>
                    <td className="published-model-name">{model.marketplaceItemName}</td>
                    <td className="published-model-creator">{model.user.fname + " " + model.user.lname + (model.user.org !== "" ? ", " + model.user.org : "")}</td>
                    <td className="published-model-model">{model.modelType.model}</td>
                    <td className="published-model-details">
                        <button onClick={() => {
                            setSelectedModel(model);
                            setIsOpen(true);
                        }}>Details</button>
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
                        Browse and Access pre-trained models
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
                    {publishedModelsLoading ? (<div>Loading...</div>) : (publishedModels.length === 0 ? (<div style={{ marginTop: "20px", fontSize: "20px" }}>No Models Available</div>) : <div className='market-body-content-list'>
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
                    {selectedModel != null && <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setIsOpen(false)}
                        style={customStyles}
                        contentLabel="Publish Modal"
                    >
                        <div className='publish-model'>
                            <div className='publish-model-header'>
                                <div className='publish-model-header-left'>
                                    {selectedModel.marketplaceItemName}
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
                                        {selectedModel.marketplaceItemDescription}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        DEVELOPED BY:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.user.fname + " " + selectedModel.user.lname + (selectedModel.user.org !== "" ? ", " + selectedModel.user.org : "")}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        MODEL TYPE:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.modelType.model}
                                    </div>
                                </div>
                                <div className='publish-model-body-other'>
                                    <div className='publish-model-body-other-title'>
                                        CONTACT:
                                    </div>
                                    <div className='publish-model-body-other-content'>
                                        {selectedModel.marketplaceItemContact}
                                    </div>
                                </div>
                            </div>
                            <div className='publish-model-footer'>
                                {selectedModel.modelType.aggregationType !== null ? (<button className='publish-model-footer-btn' onClick={downloadModel}>Download Model</button>) : (<>
                                    <div>
                                        <strong style={{ fontSize: "15px", color: "#" }}>Copy the API endpoint</strong>
                                        <span style={{ fontSize: "14px", display: "block" }}>Please refer to docs on usage of the endpoint</span>
                                    </div>
                                    <CopyToClipboard style={{ marginLeft: "50px" }} onCopy={() => setIsCopied(true)} className="copy" text={apiPath}>
                                        <button type="button" aria-label='copy to clipboard button' className='copy'>{isCopied ? <AssignmentOutlined /> : <FileCopyOutlined />}</button>
                                    </CopyToClipboard>
                                </>
                                )}
                            </div>
                        </div>
                    </Modal>}
                </div>
            </div>
        </div>
    )
}
