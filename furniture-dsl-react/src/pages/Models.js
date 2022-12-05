import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, NavLink, Row, Table } from 'react-bootstrap';
import { getModels } from '../request/models';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate, useParams } from "react-router-dom";

function Solutions() {

  const { solutionName } = useParams()
  const navigate = useNavigate()

  const [model, setModel] =useState({
    qualifiedName:"",
    uuid:""
  })
  const [models, setModels] = useState([])

  useEffect(() => {
    if (!solutionName) {
      navigate("/")
    }

    getModels(solutionName).then(res => {
      setModels(res.data.value.roots)
      setModel({
        qualifiedName:res.data.value.qualifiedName,
        uuid:res.data.value.uuid
      })
    }).catch(e => navigate("/")
    )
  }, [])

  return (
    <div className="App">
      <Row>
        <Col md={12}>
          <h1>Models List of <span style={{color:"red"}}>{model.qualifiedName}</span></h1>
        </Col>
        <hr />
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Concept</th>
                <th>Concept Alias</th>
                <th>Abstract Concept</th>
                <th>Interface Concept</th>
              </tr>
            </thead>
            <tbody>
              {models.map((modelObj, index) => <tr>
                <td><Link key={index} to={`/models/view/${model.uuid}/${model.qualifiedName}/${modelObj.id.regularId}`} >{modelObj.name || modelObj.concept || model.conceptAlias}</Link> </td>
                <td>{modelObj.concept ? modelObj.concept : "-"}</td> 
                <td>{modelObj.conceptAlias ? modelObj.conceptAlias : "-"}</td>
                <td>{modelObj.abstractConcept ? "Yes" : "No"}</td>
                <td>{modelObj.interfaceConcept ? "Yes" : "No"}</td>
              </tr>)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Solutions;
