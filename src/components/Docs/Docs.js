import React from 'react'
import "./Docs.css"

export default function Docs() {
    return (
        <div className='docs-container'>
            <div className='docs-container-content'>
                <div className='docs-section'>
                    <div className='docs-section-title'>
                        Get started with FedStation
                    </div>
                    <div className='docs-section-content'>
                        <div className='docs-section-content-item'>
                            <div className='docs-section-content-item-title'>
                                Step-1 : Create a Project in our Web Portal
                            </div>
                            <div className='docs-section-content-item-content'>
                                <div className='docs-section-content-item-content-subtitle'>
                                    Before you can add Fedstation to your application, you need to create a project in our Web Portal. 
                                    Once you have create a project, you will be given a secret key that you'll use to connect your app to Fedstation Project.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Login/Register to FedStation Web Portal
                                    <ol>
                                        <li className='list-item'>
                                            We use a simple Google OAuth to authenticate our users. You can login to FedStation Web Portal using your Google account.
                                        </li>
                                        <li className='list-item'>
                                            If you are a new user, you will be asked to enter a few details to complete the account registration. You can skip the additional details section, if you wish to not disclose such information.
                                            The additional information will be helpful while publishing the model.
                                        </li>
                                    </ol>
                                </div>

                                <div className='docs-section-content-item-content-subtitle'>
                                    Once you are logged in, you will be redirected to your console. Here you can view all your existing projects. You can also create a new project.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Create a FedStation Project <br/>
                                    <span style={{fontWeight:"400",fontSize:"0.9rem",margin:"0 0 0.5% 0.5%"}}>In the console, click on the “Create Project” button. You will be taken to a 4-step detailed process:</span>
                                    <ol>
                                        <li className='list-item'>
                                            <span style={{fontWeight:"500"}}>Project Name and Description</span> <br/>
                                            <span style={{margin:"0 0 0.5% 0.5%"}}>
                                                Enter a name for your project. Add a meaningful description to your project. 
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Project ID</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Project ID is the main identifier of your project. It is one of the details you would need to use to connect your app to Fedstation. <br/>
                                                &nbsp;&nbsp;This ID should be unique among all projects and cannot be changed once you have created your project.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Model Information</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                In this stage, you need to enter details regarding the model you will be using in your application. <br/>
                                                &nbsp;&nbsp;Details like the model type, expected user size and number of features involved with the model.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Scheduling Section</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                You need to mention the time at which the models will be sent from users to Fedstation. <br/>
                                                &nbsp;&nbsp;Also, trigger decides how many times the models are transferred to Fedstation. <br/>
                                                &nbsp;&nbsp;Select a time when your users will be least active to avoid any kind of disruption of services to users.
                                            </span>
                                        </li>
                                    </ol>
                                </div>

                                <div className='docs-section-content-item-content-additional'>
                                    Note: If you don't have an application, and want to try out our system, you can have a look at our &nbsp; <a href='https://github.com/yashwanth373/ExpTrack' target="_blank" rel="noreferrer">DEMO</a> &nbsp; application.
                                </div>
                                <div className='docs-section-content-item-content-subtitle'>
                                    After entering all details and creating a project, you will be redirected to the project's dashboard.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Project Dashboard <br />
                                    <span style={{ fontWeight: "400", fontSize: "0.9rem", margin: "0 0 0.5% 0.5%" }}>You can view a project's dashboard by clicking on the project card on console page. Here you can view all details of your project and model:</span>
                                    <ul>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Project Analytics</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Analytics Page displays statistics regarding the number of users who are using your model. <br/>                                                
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Project Settings</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                               Project Settings Page displays all the details of your project. <br/>
                                               &nbsp;&nbsp;You can edit some of the project details and also option to disable the project.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Key Settings</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Key Settings Page displays the secret key that you need to use to connect your app to Fedstation. <br/>
                                                &nbsp;&nbsp;You will have the option to regenerate the secret key and also option to disable the secret key.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Model Settings</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Model Settings Page displays the details of the model you are using in your application. <br/>
                                                &nbsp;&nbsp;You can edit the model trigger frequency. <br/>
                                                &nbsp;&nbsp;You can access your global model from this section. Know more about Model Access in the upcoming sections
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className='docs-section-content-item'>
                            <div className='docs-section-content-item-title'>
                                Step-2 : Connect your application to Fedstation
                            </div>
                            <div className='docs-section-content-item-content'>
                                <div className='docs-section-content-item-content-subtitle'>
                                    This section assumes you have your application setup ready. This workflow uses PIP to install the Fedstation Library.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Before we begin the process, we need to have 2 things ready:
                                    <ol>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Fedstation Library</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Install the FedStation Library from PIP by running the following command:
                                            </span>
                                            <br/>
                                            <span className='code-area'>
                                                pip install -i https://test.pypi.org/simple/ Fedstation
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Project Details</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Note down the Project ID from the Project Settings page. Also copy the secret key of your project from the Key Settings page.
                                            </span>
                                        </li>
                                    </ol>
                                </div>

                                <div className='docs-section-content-item-content-subtitle'>
                                   Now, you can start the process of connecting your application to Fedstation. Follow the below steps carefully:
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Connect Application to FedStation <br />
                                    <ul>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Import FedStation class from FedStation Package.</span>
                                            <br />
                                            <span className='code-area'>
                                                from Fedstation import Fedstation
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Initialize Project with Fedstation</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Create a Fedstation object and call <strong>initializeProject</strong> method as follows:
                                            </span>
                                            <br />
                                            <span className='code-area'>
                                                fedstation = Fedstation() <br/>
                                                fedstation.initializeProject(projectId, secretKey, trainingFilePath)
                                            </span>
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Here <strong>projectId</strong> is the ID of your Fedstation Project.
                                                <br />
                                                &nbsp;&nbsp;And <strong>secretKey</strong> is the secret key of your Fedstation Project.
                                                <br />
                                                &nbsp;&nbsp;And <strong>trainingFilePath</strong> is the absolute file path of your training file. You will know more about this parameter in the upcoming sections.
                                                <br/>
                                                &nbsp;&nbsp;You need to execute the <strong>initializeProject</strong> method every time the app is launched. This is to setup the scheduled tasks. 
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Model Training</span> <br />
                                            <p style={{ margin: "0 0 0.5% 0.5%" }}>
                                                The model needs to be trained on the available user data. <br/>
                                                The training functionality is totally upto you. You can access the data from your application and train the model. But in order for our system to perform this operation on a daily basis. We need to have a scheduled task.
                                            </p>
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                To setup the scheduled task, the training operation needs to be written in a seperate file. This file will be invoked by the scheduler every day to perform the training operation. <br/>
                                                &nbsp;&nbsp;The absolute path of this file is the <strong>trainingFilePath</strong> parameter that you passed to the <strong>initializeProject</strong> method. <br/>
                                                &nbsp;&nbsp;The training file should be a python file. Also once the model is trained the model needs to be saved into a file named <strong>model.pkl</strong> using the Pickle module. <br/>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='docs-section-content-item-content-additional'>
                                    Note: If you want to perform testing on your application in connection to Fedstation, you can use some additional methods using the created object. Look into the Testing section below.
                                </div>
                            </div>
                        </div>
                        <div className='docs-section-content-item'>
                            <div className='docs-section-content-item-title'>
                                Step-3 : Access your final model
                            </div>
                            <div className='docs-section-content-item-content'>
                                <div className='docs-section-content-item-content-subtitle'>
                                    Once your models are successfully sent to server and aggregated into a single model. It is time to access this global model. You hvae 2 methods two access this model. One is by downloading the model directly and second is to use the API. The Model Access section of Model Settings page in Web Portal is the place where you can access the model.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Method-1: Download the model
                                    <br/>
                                    <ul>
                                        <li className='list-item'>
                                            Under the Model Access section, the first option is to download the model.
                                        </li>
                                        <li className='list-item'>
                                            Simply click on the Download Model button to download the pickle file of the aggregated model.
                                        </li>
                                    </ul>
                                </div>

                                <div className='docs-section-content-item-content-subtitle'>
                                   Using this file, you can load the model from the file and use it to get predictions and use them anywhere as per your requirement. But sometimes downloading a file, everytime aggregation occurs and then loading it to get predictions can be a tedious task.
                                   Hence we developed this second method using which predictions can be acquired using a simple API call by setting up a few things in the early times of your application.
                                </div>

                                <div className='docs-section-content-item-content-subheading'>
                                    Method-2: API Call <br />
                                    <p style={{ fontWeight: "400", fontSize: "0.9rem", margin: "0 0 0.5% 0.5%" }}>
                                        In order to access the model using this method, the input needs to be sent in the request's body, which will be in JSON format. This JSON formatted input needs to be processed according to the model needs. Hence the developer needs to provide a file containing the input processing function. This funcion will be invoked to process the input and feed it to the model and return the predictions. <br/>
                                    </p>
                                    <ul>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Input Processing File</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                The input processing function should be a python file. The file should contain a function named <strong>processInputAndPredict</strong> , which should be of the following signature:
                                            </span>
                                            <br />
                                            <span className='code-area'>
                                                def processInputAndPredict(input,model): <br/>
                                                <span className='code-area-comments'>{"// input is the input data in JSON format"} </span>
                                                <span className='code-area-comments'>{"// model is the aggregated model <br/>"} </span>
                                                <span className='code-area-comments'>{"// format the input accordingly, feed to model and return the predictions"} </span>
                                                return predictions
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Upload Input Processing File</span> <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                The input processing file should be uploaded from the Fedstation Web Portal under the Model Access section of Model Settings page. The name of the file does not matter.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>API Endpoint</span> <br />
                                            <p style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Once the file is uploaded, you can use the API endpoint provided in the Model Settings section to get predictions.The input needs to be sent carefully in JSON format according to your necessity. This input will be available to you in a Python dictionary format in the Input Processing File.Hence, the dictionary should be processed according to the JSON format set initially. The endpoint will be of the following format:
                                            </p>
                                            <span className='code-area'>
                                                /getModelResult/&#123;projectId&#125;
                                            </span>
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Here <strong>projectId</strong> is the project id of the project for which you want to get the predictions.
                                                You can access the original endpoint, specific to your project, from your project's Model Access section.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className='docs-section-content-item-content-additional'>
                                    Note: You might be able to access the API endpoint eventhough you did not upload the Input Processing File. But you will not be able to get the predictions.
                                </div>
                            </div>
                        </div>
                        <hr style={{width:"100%"}}></hr>
                        <div className='docs-section-content-item'>
                            <div className='docs-section-content-item-title'>
                                Application Testing
                            </div>
                            <div className='docs-section-content-item-content-subtitle'>
                                If you want to test your application, you can use these methods to check whether the models are sent to Fedstation or aggregate them whenever required.
                            </div>
                            <div className='docs-section-content-item-content'>
                                <div className='docs-section-content-item-content-subheading'>
                                    <ul>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Model Sending</span>
                                            <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Once your model is ready and you want to check sending a model. Then you can call the <strong>sendModelToServer</strong> method. The function description is as below:
                                            </span>
                                            <br />
                                            <span className='code-area'>
                                                fedstation.sendModelToServer(projectId)
                                            </span>
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Here <strong>projectId</strong> is the ID of your Fedstation Project.
                                            </span>
                                        </li>
                                        <li className='list-item'>
                                            <span style={{ fontWeight: "500" }}>Model Aggregation</span>
                                            <br />
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                All models received will be aggregated based on the trigger and time set in the Fedstation Project. You can call the <strong>aggregateModels</strong> method to aggregate the models now.
                                            </span>
                                            <br />
                                            <span className='code-area'>
                                                fedstation.aggregateModels(projectId)
                                            </span>
                                            <span style={{ margin: "0 0 0.5% 0.5%" }}>
                                                Here <strong>projectId</strong> is the ID of your Fedstation Project.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='docs-section'>
                </div>
            </div>
        </div>
    )
}
