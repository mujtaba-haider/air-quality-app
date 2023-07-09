import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, Button, Input, Header, Card, Icon, Image } from "semantic-ui-react";
import './Style.css'

function AirQuality() {
    const [show, setShow] = useState(false);
    const [city1, setCity1] = useState('');
    const [city2, setCity2] = useState('');
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const aqApiKey =
        "4a02a20152e283ceeb9d8b8ab662988cebf5e8d873e97c4dfef7d24754cb0d49";

    const getAirQualityCity1 = () => {
        axios
            .get(
                `https://api.openaq.org/v2/latest?city=${city1}&api_key=${aqApiKey}`
            )
            .then((res) => {
                setData1(res.data.results)
                setCity1('')
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAirQualityCity2 = () => {
        axios
            .get(
                `https://api.openaq.org/v2/latest?city=${city2}&api_key=${aqApiKey}`
            )
            .then((res) => {
                setData2(res.data.results)
                setCity2('')
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Container>
                <Header as="h1" className="header">Check Air Quality</Header>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="col">
                                <Card>
                                    <Card.Content>
                                        <h1>
                                            {data1[0]?.measurements[0]?.value}
                                        </h1>
                                        <Card.Header>{data1[0]?.city}</Card.Header>
                                        <Card.Meta>
                                            <span>{data1[0]?.measurements[0]?.parameter}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            Matthew is a musician living in Nashville.
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='user' />
                                            22 Friends
                                        </a>
                                    </Card.Content>
                                </Card>
                                <Input value={city1} onChange={(e) => { setCity1(e.target.value) }} size="large" focus placeholder="Enter city to search..." />

                                <Button disabled={!city1} className="btn" onClick={getAirQualityCity1} primary>
                                    Search Air Quality
                                </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="col">
                                <Card>
                                    <Card.Content>
                                        <h1>
                                            {data2[0]?.measurements[0]?.value}
                                        </h1>
                                        <Card.Header>{data2[0]?.city}</Card.Header>
                                        <Card.Meta>
                                            <span>{data2[0]?.measurements[0]?.parameter}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            Matthew is a musician living in Nashville.
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='user' />
                                            22 Friends
                                        </a>
                                    </Card.Content>
                                </Card>
                                <Input value={city2} onChange={(e) => { setCity2(e.target.value) }} size="large" focus placeholder="Enter city to search..." />

                                <Button disabled={!city2} className="btn" onClick={getAirQualityCity2} primary>
                                    Search Air Quality
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
}

export default AirQuality;
