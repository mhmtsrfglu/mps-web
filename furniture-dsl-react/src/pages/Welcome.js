import React, { useEffect, useState } from 'react'
import { Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { getSolutions } from '../request/solutions'

function Welcome() {

    const [solutions, setSolutions] = useState([])
    const [filterData, setFilterData] = useState(null)
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        getSolutions().then((response) => {
            setSolutions(response.data.value)
        })
    }, [])

    const filterModel = (text) => {
        if(!text){
            setFilterData(null)
        }else
            setFilterData(solutions.filter((solution) => solution.name.toLowerCase().includes(text)))
    }

    const onFilterChange = (value) => {
        setFilterText(value)
        filterModel(value.toLowerCase());
    }



    return (
        <Container>
            <Row className="text-center">
                <Col>
                    <h1>
                        Welcome
                    </h1></Col>
            </Row>
            <hr />
            <Row className="text-center">
                <Col><h3>Solutions</h3></Col>
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 9 }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Search
                        </InputGroup.Text>
                        <Form.Control
                            onChange={e => onFilterChange(e.target.value)}
                            value={filterText}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Used Languages</th>
                                <th>ReadOnly</th>
                                <th>Packaged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filterData || solutions).map((solution, index) => <tr>
                                <td><NavLink key={index} to={"models/" + solution.name} >{solution.name}</NavLink></td>
                                <td className={"text-start"}>
                                    <ul>
                                        {solution.usedLanguages.map(language => <li>{language}</li>)}
                                    </ul>
                                </td>
                                <td>{solution.readOnly ? "Yes" : "No"}</td>
                                <td>{solution.packaged ? "Yes" : "No"}</td>

                            </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Welcome