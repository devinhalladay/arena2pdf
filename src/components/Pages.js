import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    margin: 10
  },
  section: {
    margin: 10,
    padding: 10,
  },
  titlePage: {
    fontSize: 28,
    color: '#999999',
    fontFamily: 'Helvetica-Bold',
  },
  titleView: {
    maxWidth: '90%',
    marginLeft: '5%',
  },
  green: {
    color: '#24AA23'
  },
  textWeightRegular: {
    fontFamily: 'Helvetica',
  },
  titleGroup: {
    display: 'inline',
  }
});

let collaboratorList;

export default class Pages extends Component {
  render(props) {
    if (this.props.metadata && this.props.metadata.collaborator_count > 0) {
      collaboratorList = this.props.metadata.collaborators.map((collaborator, i) => {
        return collaborator.username
      })
    }
    
    return (
      <Document
        title={this.props.metadata.title}
        creator={`arena2pdf by devin halladay`}
        producer={`arena2pdf by devin halladay`}
        author={collaboratorList !== null ? `${this.props.metadata.user.username}, ${collaboratorList}` : `${this.props.metadata.user.username}` }
      >
        <Page size="A4" style={styles.titlePage}>
          <View style={styles.titleView}>
            <Text style={styles.titleGroup}>Are.na</Text>
            <Text style={styles.titleGroup, styles.textWeightRegular}>/</Text>
            <Text style={styles.titleGroup}>{this.props.metadata.user.username.toString()}</Text>
            {this.props.metadata.collaborator_count > 0 &&
            <Text style={styles.titleGroup, styles.textWeightRegular}>{`(+${this.props.metadata.collaborator_count})`}</Text>
            }
            <Text style={styles.titleGroup, styles.textWeightRegular}>/</Text>
            <Text style={styles.titleGroup, styles.green}>{this.props.metadata.title}</Text>
          </View>
        </Page>
        {this.props.blocks.map((block) => {
          return (
            <Page size="A4" style={styles.page} key={block.id}>
              <View style={styles.section}>
                <Text>{block.title}</Text>
              </View>
            </Page>
          )
        })}
      </Document>
    )
  }
}