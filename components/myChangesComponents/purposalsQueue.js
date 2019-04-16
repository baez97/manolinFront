import React from 'react';
import PurposalView from './purposalView';
import { Text, SectionList, StyleSheet } from 'react-native';
import layoutStyle from '../../styles/layoutStyle';
import DateUtils from '../dateUtils';
const dateUtils = new DateUtils();

export default class PurposalsQueue extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.name = this.props.name;
        this.state = {
            changes : this.props.changes.filter(c => {
                return c.owner===this.name && c.type==="change"
            })
        }

        this.data = [];
        this.state.changes.forEach( c => {
            if ( ! c.accepted ) {
                this.data.push(
                    { 
                        title: this.getTitle(c),
                        change: c,
                        data: c.purposals
                    }
                );
            }
        });
    };

    getTitle(change) {
        const title = 
            `Propuestas para el ${change.day} ` + 
            `${dateUtils.getTurnString(change.turn)}`;
        return title;
    }

    keyExtractor(item) {
        return `${item._id}`;
    }

    renderItem({item, index, section}) {
        return (
            <PurposalView 
                key          = { index }
                change       = { item  }
                parentChange = { section.change }
                onPressFn    = { this.props.onPressFn }
                />
        );
    }

    renderSectionHeader({section: {title}}) {
        return <Text style={styles.textLabel}>{title}</Text>
    }

    renderEmptySection({section}) {
        if ( section.data.length === 0 ) {
            return (
                <Text style={styles.emptySectionText}>
                    No hay propuestas todavía
                </Text>
            );
        }
    }

    render() {
        if ( this.state.changes.length === 0 )
            return (
                <Text style={styles.textLabel}>
                    No hay propuestas todavía
                </Text>
            )
        return (
            <SectionList
                renderItem            = { this.renderItem          }
                renderSectionFooter   = { this.renderEmptySection  }
                contentContainerStyle = { { paddingBottom:20 }     }
                renderSectionHeader   = { this.renderSectionHeader }
                sections              = { this.data                }
                keyExtractor          = { (item, index) => index   }
                />
        )
    }
}

const styles = StyleSheet.create({
    textLabel: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.smallFontSize,
        color: '#3f2606',
        marginLeft: layoutStyle.horizontalUnits10,
        marginTop: layoutStyle.verticalUnits10*4
    },

    emptySectionText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.tinyFontSize,
        color: '#3f2606',
        textAlign: "center",
        marginTop: layoutStyle.verticalUnits10*2
    }
})