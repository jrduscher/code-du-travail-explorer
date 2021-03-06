import React from "react";
import styled from "styled-components";

import BreadCrumbs from "./BreadCrumbs";
import ThemeSelector from "./ThemeSelector";
import Result from "./Result";

import parseThemes, { parseRows } from "./parse-themes";
import rawThemes from "./data/themes.js";

import "./theme.css";

// convert themes.js at runtime for easy editing
const themes = parseThemes(rawThemes);

const getPathFromThemeId = id => {
  const theme = parseRows(rawThemes).find(t => t.id === id);
  return (
    (theme &&
      theme.themes.map(title => ({
        title
      }))) ||
    []
  );
};

const ExplorerContainer = styled.div`padding: 20px;`;

const IntroContainer = styled.div`
  margin: 40px 20px;
  font-size: 1.3em;
  color: #888;
  text-align: center;
`;

const Intro = () => (
  <IntroContainer>
    Choisissez un thème pour explorer les ressources du code du travail
    numérique
    <br />
    <br />
    1604 thèmes, 10789 articles, 206 fiches pratiques, 680 conventions, 50
    réponses
  </IntroContainer>
);

const Teaser = () => (
  <IntroContainer>
    todo : Afficher les contenus les plus demandés/utiles de ces thèmes ?
  </IntroContainer>
);

class Explorer extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    if (props.themeId) {
      // initalize with the given theme
      // todo: make consistent routes
      this.state = {
        selection: getPathFromThemeId(parseInt(props.themeId))
      };
    } else {
      this.state = {
        selection: []
      };
    }
  }
  reset = () => {
    this.setState({ selection: [] });
  };
  onSelectNode = node => {
    this.setState(curState => ({
      selection: [
        ...curState.selection,
        {
          ...node,
          articles: undefined,
          children: undefined
        }
      ]
    }));
  };
  onBreadCrumbClick = (item, idx) => {
    this.setState(curState => ({
      selection: curState.selection.slice(0, idx)
    }));
  };
  getCurrentTheme = () => {
    let node = themes;
    this.state.selection.forEach(theme => {
      const subNode = node.children.find(n => n.title === theme.title);
      if (subNode) {
        node = subNode;
      }
    });
    return node;
  };

  render() {
    const breadcrumbs = this.state.selection;
    const isStarted = breadcrumbs.length;
    const currentTheme = this.getCurrentTheme();
    const isLeaf = currentTheme.children.length === 0;
    return (
      <ExplorerContainer>
        <BreadCrumbs
          style={{ marginBottom: 10, marginLeft: 10 }}
          entries={breadcrumbs}
          onClick={this.onBreadCrumbClick}
        />
        <ThemeSelector node={currentTheme} onSelect={this.onSelectNode} />
        {isLeaf && <Result onResetClick={this.reset} theme={currentTheme} />}
        {!isStarted && <Intro />}
        {(isStarted && !isLeaf && <Teaser />) || null}
      </ExplorerContainer>
    );
  }
}

export default Explorer;
