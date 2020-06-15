import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import {
    getControls, getPerformedControls, savePerformedControl, setStatusToFinish,
    deletePerformedControl, setStatusToControls, getUpdateControls, updateControl
} from '../utils/MongoDbUtils';
import MainButton from '../components/MainButton';
import { Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';



class ControlScreen extends React.Component {

    TOTAL_IN_PAGE = 10;

    constructor(props) {
        super(props);
        this.state = {
            controls: [],
            performed: [],
            update: [],
            currenctPage: 0,
            showMoreInfoModal: false,
            problemInControl: false,
            moreInfoItem: null,
            showUpdateControl: false,
            updateItem: [],
            updateControlText: null
        }
    }

    componentDidMount() {
        this.loadControls();
        this.loadPerformedControls();
        this.loadUpdateControls();
    }

    loadControls = () => {
        getControls(this.props.route.params.riskLevel).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                controls: result
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    loadPerformedControls = () => {
        getPerformedControls(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                performed: result
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    loadUpdateControls = () => {
        getUpdateControls(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                update: result
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    saveUpdateControl = (subclauseNmber, updateControlText) => {
        updateControl(this.context.userId, this.context.systemId, subclauseNmber, updateControlText).then(result => {
        }).catch(error => {
            console.log('fail', error);
        });
    }

    onNextPageClick = () => {
        this.setState((prevState) => {
            return {
                currenctPage: prevState.currenctPage + 1
            }
        });
    }

    onPrevPageClick = () => {
        this.setState((prevState) => {
            return {
                currenctPage: prevState.currenctPage - 1
            }
        });
    }

    onShowMoreInfoClick = (selectedItem) => {
        this.setState({
            showMoreInfoModal: true,
            moreInfoItem: selectedItem

        });


    }

    onCloseMoreInfoClick = () => {
        this.setState({
            showMoreInfoModal: false
        });
    }

    onShowControlProblemClick = () => {
        this.setState({
            problemInControl: true,
        });
    }

    onCloseControlProblemClick = () => {
        this.setState({
            problemInControl: false
        });
    }

    onShowUpdateControlClick = (selectedItem) => {
        this.setState({
            showUpdateControl: true,
            updateItem: selectedItem
        });
        this.getValue(selectedItem)
    }

    onCloseUpdateClick = () => {
        this.setState({
            showUpdateControl: false,
        });
    }

    onCloseAndUpdateClick = () => {
        this.setState((prevState) => {
            const itemIndex = prevState.update.findIndex((pid) => pid.subclauseNmber == prevState.updateItem.subclauseNmber);
            const newUpdate = [...prevState.update];
            if (itemIndex > -1) {
                newUpdate[itemIndex]['updateControl'] = prevState.updateControlText;
            }
            else {
                newUpdate.push({
                    subclauseNmber: prevState.updateItem.subclauseNmber,
                    updateControl: prevState.updateControlText
                });
            }
            this.saveUpdateControl(prevState.updateItem.subclauseNmber, prevState.updateControlText);
            return {
                update: newUpdate,
                showUpdateControl: false
            }
        })
    }

    onControlItemClicked = (item) => {
        this.setState((prevState) => {
            const itemIndex = prevState.performed.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber);
            const newPerformed = [...prevState.performed];
            if (itemIndex > -1) {
                newPerformed.splice(itemIndex, 1);
                deletePerformedControl(this.context.systemId, item.subclauseNmber).then(result => {
                    if (!result) {
                        return;
                    }
                }).catch(error => {
                    console.log('fail', error);
                });
                this.state.performed.length == this.state.controls.length && setStatusToControls(this.context.systemId).then(result => {
                    if (!result) {
                        return;
                    }
                }).catch(error => {
                    console.log('fail', error);
                });
            }
            else {
                newPerformed.push({
                    controlId: item.controlId,
                    subclauseNmber: item.subclauseNmber,
                });
                savePerformedControl(this.context.userId, this.context.systemId, item._id, item.subclauseNmber);
              
                this.state.performed.length+1 == this.state.controls.length && setStatusToFinish(this.context.systemId).then(result => {
                    if (!result) {
                        return;
                    }
                }).catch(error => {
                    console.log('fail', error);
                });
            }
            return {
                performed: newPerformed
            };
        });
    }

    getIndex = (item) => {
        if (!!item) {
            return this.state.update.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber)
        }
        return -1
    }

    getValue = (item) => {
        let index = this.getIndex(item)
        let value = ""
        if (index > -1 && !!this.state.update[index].updateControl) {
            value = this.state.update[index].updateControl
        }
        this.setState({
            updateControlText: value
        })
        return value;
    }

    render() {
        const start = this.state.currenctPage * this.TOTAL_IN_PAGE;
        const end = start + this.TOTAL_IN_PAGE;
        const controlsList = this.state.controls.slice(start, end);
        return (
            <ScrollView >
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>בקרות נדרשות לביצוע</Text>
                {
                    controlsList.map((item) => {
                        const showMoreInfo = !!item.comment || !!item.suggestion || !!item.test;
                        let selectedStyle = {};
                        if (this.state.performed.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber) > -1) {
                            selectedStyle = { backgroundColor: '#D3D3D3' };
                        }
                        return (
                            <TouchableOpacity key={item._id} onPress={() => { this.onControlItemClicked(item) }}>
                                <View style={[styles.controlContainer, selectedStyle]} key={item._id.toString()}>
                                    < View style={{ flexDirection: 'row' }}>
                                        <CheckBox
                                            value={this.state.performed.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber) > -1}
                                            onValueChange={() => this.onControlItemClicked(item)}
                                        />
                                        <Text style={{ flex: 1, fontSize: 16 }}>{item.subclauseNmber} {item.subclause}</Text>
                                    </View>
                                    {this.state.update.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber) > -1 &&
                                        <>
                                            < Text style={{ fontWeight: 'bold', marginStart: 31 }}>{this.state.update[this.getIndex(item)].updateControl}</Text>
                                        </>
                                    }
                                    <View style={styles.modalLinks}>
                                        {showMoreInfo &&
                                            <TouchableOpacity onPress={() => { this.onShowMoreInfoClick(item) }}>
                                                <Text style={styles.moreInfoButton}>מידע נוסף</Text>
                                            </TouchableOpacity>
                                        }
                                        {
                                            this.state.performed.findIndex((pid) => pid.subclauseNmber == item.subclauseNmber) == -1 &&
                                            <>
                                                <TouchableOpacity onPress={() => { this.onShowControlProblemClick() }}>
                                                    <Text style={styles.moreInfoButton}>בעיה בביצוע הבקרה</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { this.onShowUpdateControlClick(item) }}>
                                                    <Text style={styles.moreInfoButton}>עדכון דרישות הבקרה</Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }


                <View style={styles.button}>
                    {end < this.state.controls.length
                        ? <MainButton onPress={this.onNextPageClick} title="לעמוד הבא" height={50} width="65%" />
                        : <MainButton onPress={() => { this.props.navigation.navigate("System") }} title="סיום" height={50} width="65%" />
                    }
                </View>
                <View style={styles.prebutton}>
                    {this.state.currenctPage > 0 &&
                        <TouchableOpacity onPress={this.onPrevPageClick} title="לעמוד הקודם" style={styles.previousTouchable}>
                            <Text style={styles.previousText}>לעמוד הקודם</Text>
                        </TouchableOpacity>
                    }
                </View>


                <Modal
                    onRequestClose={this.onCloseMoreInfoClick}
                    visible={this.state.showMoreInfoModal}>
                    <View style={styles.outerStyle}>
                        <View style={styles.inner}>
                            {
                                !!this.state.moreInfoItem && !!this.state.moreInfoItem.comment && (
                                    <>
                                        <Text style={styles.moreInfoItemTitle}>הערות:</Text>
                                        <Text>{this.state.moreInfoItem.comment}</Text>
                                    </>
                                )
                            }
                            {
                                !!this.state.moreInfoItem && !!this.state.moreInfoItem.suggestion && (
                                    <>
                                        <Text style={styles.moreInfoItemTitle}>המלצות:</Text>
                                        <Text>{this.state.moreInfoItem.suggestion}</Text>
                                    </>
                                )
                            }

                            {
                                !!this.state.moreInfoItem && !!this.state.moreInfoItem.test && (
                                    <>
                                        <Text style={styles.moreInfoItemTitle}>בדיקה:</Text>
                                        <Text>{this.state.moreInfoItem.test}</Text>
                                    </>
                                )
                            }

                            <TouchableOpacity onPress={this.onCloseMoreInfoClick}>
                                <Text style={styles.closeButton}>סגירה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    onRequestClose={this.onCloseControlProblemClick}
                    visible={this.state.problemInControl} >
                    <View style={styles.outerStyle}>
                        <View style={styles.inner}>
                            <Text style={styles.modalText}>יש ליצור קשר עם דוד ויסמן</Text>
                            <Text style={styles.modalText}>DavidV@sviva.gov.il‏</Text>
                            <TouchableOpacity onPress={this.onCloseControlProblemClick}>
                                <Text style={styles.closeButton}>סגירה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    onRequestClose={this.onCloseUpdateClick}
                    visible={this.state.showUpdateControl}>
                    <View style={styles.outerStyle}>
                        <View style={styles.inner}>
                            {!!this.state.updateItem &&
                                <Text style={[styles.modalText, { fontWeight: 'bold', marginBottom: '1%' }]}>עדכון בקרה {this.state.updateItem.subclauseNmber}</Text>
                            }
                            <Text style={styles.modalText}>*לאחר קבלת אישור מהמשרד להגנת הסביבה</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ updateControlText: text })}
                                style={styles.textArea}
                                placeholder="יש להוסיף את תאריך אישור העדכון "
                                numberOfLines={5}
                                multiline={true}
                                value={this.state.updateControlText}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity onPress={this.onCloseAndUpdateClick}>
                                    <Text style={styles.closeButton}>אישור</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onCloseUpdateClick}>
                                    <Text style={styles.closeButton}>סגירה</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView >
        )
    }

}
const styles = StyleSheet.create({
    controlContainer: {
        flex: 1,
        borderTopColor: '#666666',
        borderTopWidth: 1,
        borderBottomColor: '#666666',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    buttonsContainer: {
        flexDirection: 'row-reverse'
    },

    button: {
        flex: 1,
        margin: 0
    },
    previousTouchable: {
        alignSelf: 'center',
        marginTop: 8
    },
    previousText:
    {
        color: '#169BD5'
    },

    moreInfoButton: {
        color: '#169BFF',
        fontWeight: 'bold'
    },

    outerStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inner: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },

    closeButton: {
        color: '#169BD5',
        paddingTop: '3%'
    },

    moreInfoItemTitle: {
        fontWeight: 'bold',
        paddingTop: '3%'
    },
    modalLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3
    },
    modalText: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    textArea: {
        // borderColor: '#169BD5',
        borderWidth: 2,
        borderRadius: 10,
        height: 150,
        justifyContent: "flex-start",
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
    },
});

ControlScreen.contextType = UserContext;

export default ControlScreen;

