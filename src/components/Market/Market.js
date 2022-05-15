import React,{useEffect,useState} from 'react'
import "./Market.css"

export default function Market() {
    // const { currentUser } = useAuth()

    const [publishedModels, setPublishedModels] = useState([])
    const [publishedModelsLoading, setPublishedModelsLoading] = useState(true)
    const [filteredModels, setFilteredModels] = useState([])
    const [search, setSearch] = useState("")



    useEffect(() => {
        // getPublishedModels()
        //     .then((res) => {
        //         setPublishedModels(res)
        //         setPublishedModelsLoading(false)
        //     }
        //     )
        //     .catch((err) => {
        //         console.log(err)
        //     })

        setPublishedModelsLoading(false)
        setPublishedModels([
            {
                id: 1,
                name: "Chat Filtering",
                description: "This is a model",
                contact : "abc@def.com",
                createdBy : "ALLO, ALLOCOMPANY",
                modelType : "Linear Regression"
            },
            {
                id: 2,
                name: "Expense Prediction",
                description: "This is a model",
                contact: "abc@def.com",
                createdBy: "ALLO, ALLOCOMPANY",
                modelType: "Linear Regression"
            },
            {
                id: 3,
                name: "Image Classification",
                description: "This is a model",
                contact: "abc@def.com",
                createdBy: "ALLO, ALLOCOMPANY",
                modelType: "Linear Regression"
            }, {
                id: 4,
                name: "Dining Prediction",
                description: "This is a model",
                contact: "abc@def.com",
                createdBy: "ALLO, ALLOCOMPANY",
                modelType: "Linear Regression"
            },
            {
                id: 5,
                name: "Keyboard word Prediction",
                description: "This is a model",
                contact: "abc@def.com",
                createdBy: "ALLO, ALLOCOMPANY",
                modelType: "Linear Regression"
            }
        ])
    
    }, [])

    useEffect(() => {
        let filterModels = publishedModels.filter(model => {
            return model.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredModels(filterModels)
    }, [publishedModels, search])

    

    const renderPublishedModels = () => {
        if (publishedModelsLoading) {
            return <div>Loading...</div>
        }
        else {
            return filteredModels.map((model) => {
                return (
                    <div className="published-model-container" key={model.id}>
                        <div className="published-model-name">{model.name}</div>
                        <div className="published-model-description">{model.description}</div>
                    </div>
                )
            })
        }
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
                    <div className='market-body-content-list'>
                        {renderPublishedModels()}
                    </div>
                </div>
            </div>
        </div>
    )
}
