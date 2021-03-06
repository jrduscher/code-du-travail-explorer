import React from "react";
import * as Feather from "react-feather";
import StarRating from "react-star-rating-component";
import styled from "styled-components";

import FeedbackForm from "./FeedbackForm";
import ConventionPicker from "./ConventionPicker";
import Articles from "./Articles";
import Fiches, { hasFiche } from "./Fiches";
import FAQ, { hasFaq } from "./FAQ";
import Articulation from "./Articulation";

// page de résultats

const ButtonReset = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;
const Center = styled.div`text-align: center;`;

const Block = styled.div`
  padding: 10px;
  background: ${props => props.theme.light3};
  border-radius: 2px;
  vertical-align: top;
  margin: 1em 10px;
  font-size: 0.9em;
  li {
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  svg {
    vertical-align: bottom;
  }
  .dv-star-rating {
    font-size: 1.5em;
    vertical-align: middle;
    margin-left: 10px;
  }
`;

const color = "#0e4d52";

const BlockTitle = styled.div`
  font-size: 1.2em;
  color: ${props => props.theme.primary};
  svg {
    vertical-align: bottom;
  }
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${props => props.theme.primary};
`;

const TwoCols = styled.div`
  width: 100%;
  > div {
    width: calc(50% - 20px);
    margin: 10px;
    display: inline-block;
    box-sizing: border-box;
  }
`;

const SectionSeparator = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
  font-size: 1.5em;
  background-color: ${props => props.theme.light2};
`;

const Result = ({ onResetClick, theme }) => {
  const hasFaqEntry = hasFaq(theme);
  const hasFicheEntry = hasFiche(theme);
  return (
    <div style={{ marginTop: 20 }}>
      {(hasFaqEntry || hasFicheEntry) && (
          <div>
            <SectionSeparator>F.A.Q. et fiches</SectionSeparator>

            {hasFaqEntry && (
              <Block>
                <BlockTitle>
                  <Feather.HelpCircle size="20" /> F.A.Q. Code du travail
                </BlockTitle>
                <FAQ theme={theme} />
              </Block>
            )}

            {hasFicheEntry && (
              <Block>
                <BlockTitle>
                  <Feather.FileText size="20" /> Fiches pratiques
                </BlockTitle>
                <Fiches theme={theme} />
              </Block>
            )}
          </div>
        )}

      <SectionSeparator>Textes officiels</SectionSeparator>

      <Block>
        <BlockTitle>
          <Feather.AlertTriangle size="20" /> Textes applicables
        </BlockTitle>
        <Articulation theme={theme} />
        {/*Attention, dans votre entreprise va s'appliquer également des
        conventions et accords de branche ou d'entreprise.*/}
      </Block>

      <Block>
        <BlockTitle>
          <Feather.Paperclip size="20" /> Textes conventionnels
        </BlockTitle>
        Trouvez votre convention collective :
        <br />
        <br />
        <ConventionPicker />
        <li>
          <a
            target="_blank"
            href="https://www.legifrance.gouv.fr/initRechAccordsEntreprise.do"
          >
            Trouver votre accord d'entreprise <Feather.Search size="12" />
          </a>
        </li>
      </Block>

      {theme.articles &&
        theme.articles.length && (
          <Block>
            <BlockTitle>
              <Feather.Book size="20" /> Code du Travail Articles
            </BlockTitle>
            <Articles theme={theme} />
          </Block>
        )}

      <SectionSeparator>Voir aussi</SectionSeparator>

      {/*
      <Block>
        <BlockTitle>
          <Feather.Plus size="20" /> Liens externes
        </BlockTitle>
        <li>
          <a href="#">Liens vers thèmes similaires</a>
        </li>
      </Block>*/}

      <TwoCols>
        <Block>
          <BlockTitle>
            <Feather.Phone size="20" /> Vos interlocuteurs
          </BlockTitle>
          <li>
            <a href="http://grand-est.direccte.gouv.fr/Presentation-de-l-unite-departementale-Nous-contacter-17713">
              Services de renseignement
            </a>
          </li>
          <li>
            <a href="https://www.ast67.org/">Médecine du travail</a>
          </li>
          <li>
            <a href="https://www.defenseurdesdroits.fr/office">
              Défenseur des droits
            </a>
          </li>
        </Block>

        <Block>
          <BlockTitle>
            <Feather.Link size="20" /> Liens et outils
          </BlockTitle>
          <li>
            <a href="#">
              Lien 1 <Feather.ExternalLink size="12" />
            </a>
          </li>
          <li>
            <a href="#">
              Lien 2 <Feather.ExternalLink size="12" />
            </a>
          </li>
        </Block>
      </TwoCols>

      <Block>
        <BlockTitle>
          <Feather.ThumbsUp size="20" /> Aidez-nous à nous améliorer
        </BlockTitle>
        Avons-nous répondu à votre question ?
        <StarRating name="stars" value={null} />
        <FeedbackForm />
      </Block>

      <Block>
        <BlockTitle>
          <Feather.Trash2 size="20" /> Nouvelle demande
        </BlockTitle>
        <Center>
          <ButtonReset onClick={onResetClick}>
            Faire une nouvelle demande
          </ButtonReset>
        </Center>
      </Block>
    </div>
  );
};
export default Result;
