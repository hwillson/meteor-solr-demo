import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http';
import SearchConfig from './search_config';

const getSuggestions = new ValidatedMethod({
  name: 'getSuggestions',
  validate: new SimpleSchema({
    suggestionKeywords: {
      type: String,
    },
  }).validator(),
  run({ suggestionKeywords }) {
    let suggestions;
    if (!this.isSimulation) {
      const response = HTTP.get(SearchConfig.getSuggesterUrl(), {
        query: `wt=json&suggest.q=${suggestionKeywords}&suggest.count=10`,
      });
      if (response) {
        const searchResponse = JSON.parse(response.content);
        const suggest = searchResponse.suggest;
        const suggester = suggest[Object.keys(suggest)[0]];
        const termSuggester = suggester[Object.keys(suggester)[0]];
        const loadedSuggestions = new Set();
        termSuggester.suggestions.forEach((suggestion) => {
          loadedSuggestions.add(suggestion.term);
        });
        suggestions = Array.from(loadedSuggestions);
      }
    }
    return suggestions;
  },
});

export default getSuggestions;
