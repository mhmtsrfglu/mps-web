import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hostAddress, mpsServerPort } from '../core/constants';
import { getModelData } from '../request/models';
import {
    editableCell,
    registerRenderer,
    row, tabCell,
    referenceCell,
    verticalCollectionCell,
    verticalGroupCell
} from "webeditkit";

import _ from "lodash"
import { useNavigate } from 'react-router-dom/dist';


const ModelChildrenView = () => {

    const { uuid, referenceName, regularId, component } = useParams()

    const navigate = useNavigate()

    const [modelData, setModelData] = useState()

    const JqueryCode = async (model) => {
        const webeditkit = require("webeditkit");
        await webeditkit.setup()

        const groupModelChildren = _.chain(model.children).filter(item => item.containingLink === component).value()

        const modelChildrenConcept = groupModelChildren[0].concept

        await registerRenderer(model.concept, (node) => {
            return verticalGroupCell(
                webeditkit.h("div.project-title", {},
                    row(
                        webeditkit.h('div.col', {}, "Project Name "),
                        webeditkit.h("div.col", {}, editableCell(new webeditkit.Data(), node, 'name')),
                    )),
                webeditkit.h('hr', {}),
                row(webeditkit.h('div.seperator', {}, component)),
                row(tabCell(), verticalCollectionCell(node, component))
            )
        })


        if (Object.keys(groupModelChildren[0].properties).length) {
            Object.keys(groupModelChildren[0].properties).forEach(key => {
                registerRenderer(modelChildrenConcept, (node) => {

                    return verticalGroupCell(
                        row(
                            webeditkit.h("div.col.f-width", {}, editableCell(new webeditkit.Data(), node, key)),
                            Object.keys(groupModelChildren[0].refs).length ? webeditkit.h("div.col.f-width", {}, referenceCell(node, Object.keys(groupModelChildren[0].refs)[0])) : null,

                        )
                    )
                })
            })

        }

        await webeditkit.addModel(`${hostAddress}:${mpsServerPort}`, referenceName, regularId, "view-piece")
    }


    useEffect(() => {

        getModelData(referenceName, regularId).then(response => {
            setModelData(response.data.value)
            JqueryCode(response.data.value)
        })
    }, [])

    return (
        <>
            <div id={"view-piece"}>

            </div>
            <hr />
            <div>
                <button className={"btn btn-success"} onClick={()=>navigate(`/models/view/${uuid}/${referenceName}/${regularId}`)}>List Models</button>
            </div>
        </>
    );
};

export default ModelChildrenView;