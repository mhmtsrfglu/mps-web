import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getModelData, getModels, registerModelPage } from '../request/models';
import _ from "lodash"
import { Tab } from 'bootstrap';
import { hostAddress, projectorAddress, TOKEN } from '../core/constants';

const ModelView = () => {

    const { uuid, referenceName, regularId } = useParams()
    const [modelData, setModelData] = useState({ name: "" })
    const [modelList, setModelList] = useState([])

    const navigate = useNavigate()

    const redirectToViewModel = (pRegularId) => {
        navigate(`/models/view/${uuid}/${referenceName}/${pRegularId}`)
    }

    async function getData() {
        const modelsResponse = await getModels(referenceName)
        const modelDataResponse = await getModelData(referenceName, regularId)
        modelDataResponse.data.value.children = _.chain(modelDataResponse.data.value.children).groupBy(prop => prop.containingLink).value()
        setModelData(modelDataResponse.data.value)
        setModelList(modelsResponse.data.value.roots)
        await registerModelPage(uuid, referenceName, regularId)


    }

    useEffect(() => {
      
        getData()

        return () =>{
            setModelList([])
            setModelData({ name: "" })
        }

    }, [uuid, referenceName, regularId])

    return (
        <Container key={"model-view-container"} className='model-view-container'>
            <Row style={{ fontSize: 16 }}>
                <Col>
                    <div>FileName: <span style={{ color: 'red' }}>{modelData.name}</span></div>
                </Col>
                <Col>
                    <div>Concept: <span style={{ color: 'red' }}>{modelData.concept}</span></div>
                </Col>
                <Col>
                    <div>Concept Alias: <span style={{ color: 'red' }}>{modelData.conceptAlias}</span></div>
                </Col>
            </Row>
            <hr />
            {modelList.length && <Row className='h-100'>
                <Col md={6} style={{ wordWrap: "break-word" }}>
                    <Tabs
                        defaultActiveKey={regularId}
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                        onSelect={(eventKey) => redirectToViewModel(eventKey)}
                    >
                        {modelList.map((modelObj, index) =>
                            <Tab key={`tab_${index}`}
                                eventKey={modelObj.id.regularId} title={modelObj.name || modelObj.concept || model.conceptAlias}
                            >

                                {modelData.children && Object.keys(modelData?.children).map((value, key) => {
                                    return <div>
                                        <Link key={key} to={`/models/view/${uuid}/${referenceName}/${regularId}/${value}`} >{value}</Link>
                                        <ul>
                                            {modelData.children[value].map((item) => (item.conceptAlias && item.name) ? <li key={`li_$`}>{item.name}</li> : null)}
                                        </ul>
                                    </div>
                                })}
                            </Tab>)}
                    </Tabs>
                </Col>

                <Col style={{ position: "relative" }} md={6}>
                    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
                        <iframe style={{ pointerEvents: "auto" }} width={"100%"} height={"100%"} src={`http://${projectorAddress}/index.html?host=${hostAddress}&port=8887&token=${TOKEN}`} />
                    </div>
                </Col>
            </Row>}
        </Container>
    );
};

export default ModelView;