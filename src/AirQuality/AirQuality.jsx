import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, Button, Input, Header, Card, Icon } from "semantic-ui-react";
import './Style.css';

const aqApiKey =
    "4a02a20152e283ceeb9d8b8ab662988cebf5e8d873e97c4dfef7d24754cb0d49";

function AirQuality() {
    const [city1, setCity1] = useState('');
    const [city2, setCity2] = useState('');
    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {

            const res1 = await axios.get(`https://api.openaq.org/v2/latest?city=${city1}&api_key=${aqApiKey}`)

            const res2 = await axios.get(`https://api.openaq.org/v2/latest?city=${city2}&api_key=${aqApiKey}`)

            setData1(res1.data.results);
            setData2(res2.data.results);
        }
        catch (err) {
            setError(err);
        }
    }

    const getAirQualityRange = (value) => {
        if (value >= 0 && value <= 50) {
            return { range: 'Good', color: 'green' };
        } else if (value >= 51 && value <= 100) {
            return { range: 'Moderate', color: 'yellow' };
        } else if (value >= 101 && value <= 150) {
            return { range: 'Unhealthy for Sensitive Groups', color: 'orange' };
        } else if (value >= 151 && value <= 200) {
            return { range: 'Unhealthy', color: 'red' };
        } else if (value >= 201 && value <= 300) {
            return { range: 'Very Unhealthy', color: 'purple' };
        }
    };

    const value1 = data1 ? data1[0]?.measurements[0]?.value : 0
    const value2 = data2 ? data2[0]?.measurements[0]?.value : 0

    const name1 = data1 ? data1[0]?.city : ''
    const name2 = data2 ? data2[0]?.city : ''

    const color1 = getAirQualityRange(value1)?.color;
    const color2 = getAirQualityRange(value2)?.color;

    const range1 = getAirQualityRange(value1)?.range;
    const range2 = getAirQualityRange(value2)?.range;

    return (
        <div>
            <Container>
                <Header as="h1" className="heading">Check Air Quality</Header>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="col">
                                {data1 &&
                                    <Card className="card">
                                        {data1?.length !== 0 ?
                                            <Card.Content>
                                                <h1>
                                                    {value1} <Icon color={color1} name="leaf" />
                                                </h1>
                                                <Card.Header>{name1}</Card.Header>
                                                <Header as="h2" color={color1}>{range1}</Header>
                                            </Card.Content>
                                            :
                                            <Header as="h2" color="orange" className="nodata">No record found</Header>
                                        }
                                    </Card>
                                }

                                <Input value={city1} onChange={(e) => { setCity1(e.target.value) }} size="large" focus placeholder="Enter first city" />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="col">
                                {data2 &&
                                    <Card className="card">
                                        {data2?.length !== 0 ?
                                            <Card.Content>
                                                <h1>
                                                    {value2} <Icon color={color2} name="leaf" />
                                                </h1>
                                                <Card.Header>{name2}</Card.Header>
                                                <Header as="h2" color={color2}>{range2}</Header>
                                            </Card.Content>
                                            :
                                            <Header as="h2" color="orange" className="nodata">No record found</Header>
                                        }
                                    </Card>
                                }
                                <Input value={city2} onChange={(e) => { setCity2(e.target.value) }} size="large" focus placeholder="Enter second city" />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Button disabled={!(city1 && city2)} className="btn" onClick={handleSubmit} primary>
                    Compare air quality
                </Button>

                {error &&
                    <Header as="h3" color="red">{error}</Header>
                }
            </Container>
        </div>
    );
}

export default AirQuality;
