import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  section: {
    color: 'black',
    flexWrap: 'wrap',
    display: 'flex'
  },
  titleView: {
    fontSize: 28,
    color: '#999999',
    fontFamily: 'Helvetica-Bold',
    display: 'flex',
    flexWrap: 'wrap',
    hyphens: 'none',
    wordBreak: 'break-word'
  },
  green: {
    color: '#24AA23'
  },
  textWeightRegular: {
    fontFamily: 'Helvetica',
  },
  channelDescription: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1,
    width: "50%",
    paddingTop: 20
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
        <Page size="A4" style={styles.page}>
          <View style={styles.titleView}>
            <Text style={styles.titleView}>
              <Text>Are.na</Text>
              <Text style={styles.textWeightRegular}> / </Text>
              <Text>{this.props.metadata.user.username.toString()}</Text>
              {this.props.metadata.collaborator_count > 0 &&
              <Text style={styles.textWeightRegular}>{`(+${this.props.metadata.collaborator_count})`}</Text>
              }
              <Text style={styles.textWeightRegular}> / </Text>
              <Text style={styles.green}>{this.props.metadata.title}</Text>
            </Text>
            <Text style={styles.channelDescription}>{this.props.metadata.metadata.description}</Text>
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