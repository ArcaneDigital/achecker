# AChecker
A wrapper for the AChecker API. [AChecker](http://www.atutor.ca/achecker/) API.  You will need an [API KEY](http://achecker.ca/documentation/web_service_api.php) to use the service.

## Install via NPM!
```
npm install achecker
```

## Example usage
```js
'use strict';
var achecker = require('achecker');

var a = new achecker({
    key: 'YOUR_API_KEY',
    uri : 'http://www.example.com/',
    offset: 0,
    guide: 'WCAG1-AA'
}, function(result){
    console.log(result);
});

```

## Supported options

The available options are:
* `key` (required):The "Web Service ID" generated by AChecker when you register. This ID is a 40 characters long string. (Default: none)
* `uri` (required): The encoded URL of the document to validate. (Default: none)
* `offset` (optional): The line offset to begin validation on the html output from URI. (Default: 0)
* `guide` (optional): The guidelines to validate against. Separate each guideline with comma (,). (Default: WCAG2-AA)
    - BITV1: abbreviation of guideline bitv-1.0-(level-2);
    - 508: abbreviation of guideline section-508;
    - STANCA: abbreviation of guideline stanca-act;
    - WCAG1-A: abbreviation of guideline wcag-1.0-(level-a);
    - WCAG1-AA: abbreviation of guideline wcag-1.0-(level-aa);
    - WCAG1-AAA: abbreviation of guideline wcag-1.0-(level-aaa);
    - WCAG2-A: abbreviation of guideline wcag-2.0-l1;
    - WCAG2-AA: abbreviation of guideline wcag-2.0-l2;
    - WCAG2-AAA: abbreviation of guideline wcag-2.0-l3.



## Example Response

```js
{
  summary: {
    sessionID: "2fb79cef7f3cdf79b39154e6f8c84cdce1df0f92",
    errors: 1,
    likelyProblems: 1,
    potentialProblems: 3
  },
  results: [
    {
      resultType: "Error",
      lineNum: "2",
      columnNum: "1",
      columnNum: "<a href=\"http://achecker.ca/checker/suggestion.php?id=232\" onclick=\"AChecker.popup('http://achecker.ca/checker/suggestion.php?id=232'); return false;\" title=\"Suggest improvements on this error message\" target=\"_new\">Document does not validate.</a>",
      errorSourceCode: "<html>\n<head> <title>Example Domain</title> <meta charset=\"utf-8\" /> <meta http-equiv=\" ...",
      repair: "Validate the document using a validator service."
    },
    {
      resultType: "Potential Problem",
      lineNum: "4",
      columnNum: "5",
      columnNum: "<a href=\"http://achecker.ca/checker/suggestion.php?id=54\" onclick=\"AChecker.popup('http://achecker.ca/checker/suggestion.php?id=54'); return false;\" title=\"Suggest improvements on this error message\" target=\"_new\"><code>title</code> might not describe the document.</a>",
      errorSourceCode: "<title>Example Domain</title>",
      sequenceID: "4_5_54",
      decisionPass: "<code>title</code> describes the document.",
      decisionFail: "<code>title</code> does not describe the document."
    },
    {
      resultType: "Potential Problem",
      lineNum: "44",
      columnNum: "5",
      columnNum: "<a href=\"http://achecker.ca/checker/suggestion.php?id=42\" onclick=\"AChecker.popup('http://achecker.ca/checker/suggestion.php?id=42'); return false;\" title=\"Suggest improvements on this error message\" target=\"_new\"><code>h1</code> may be used for formatting.</a>",
      errorSourceCode: "<h1>Example Domain</h1>",
      sequenceID: "44_5_42",
      decisionPass: "This <code>h1</code> element is really a section header.",
      decisionFail: "This <code>h1</code> element is used to format text (not really a section header)."
    },
    {
      resultType: "Potential Problem",
      lineNum: "47",
      columnNum: "8",
      columnNum: "<a href=\"http://achecker.ca/checker/suggestion.php?id=19\" onclick=\"AChecker.popup('http://achecker.ca/checker/suggestion.php?id=19'); return false;\" title=\"Suggest improvements on this error message\" target=\"_new\">Link text may not be meaningful.</a>",
      errorSourceCode: "<a href=\"http://www.iana.org/domains/example\">More information...</a>",
      sequenceID: "47_8_19",
      decisionPass: "Link text is meaningful when read alone (out of context).",
      decisionFail: "Link text is not meaningful when read alone (out of context)."
    },
    {
      resultType: "Likely Problem",
      lineNum: "47",
      columnNum: "8",
      columnNum: "<a href=\"http://achecker.ca/checker/suggestion.php?id=18\" onclick=\"AChecker.popup('http://achecker.ca/checker/suggestion.php?id=18'); return false;\" title=\"Suggest improvements on this error message\" target=\"_new\">Anchor that opens new window may be missing warning.</a>",
      errorSourceCode: "<a href=\"http://www.iana.org/domains/example\">More information...</a>",
      sequenceID: "47_8_18",
      decisionPass: "There is a warning to user that anchor opens a new window.",
      decisionFail: "User is not given warning that anchor opens a new window."
    }
  ]
}
```

## Response Format

* `summary`: The summary element of the validation response.
    - `status`: Can be one of these values: FAIL, CONDITIONAL PASS, PASS. FAIL is set when there is/are known problem(s). CONDITIONAL PASS is set when there is no known problems but there is/are likely or potential problem(s). PASS is set when there is no problems found, OR, there is no known problems and likely/potential problems have pass decisions made on.
    - `errors`: Counts the number of known problems.
    - `likelyProblems`: Counts the number of likely problems.
    - `potentialProblems`: Counts the number of potential problems.
* `result`:
    - `resultType`: Can be one of these values: _Error_, _Likely Problem_, _Potential Problem_.
    - `lineNum`: Within the source code of the validated document, refers to the line where the error was detected.
    - `columnNum`: Within the source code of the validated document, refers to the column of the line where the error was detected.
    - `errorMsg`: The actual error message.
    - `errorSourceCode`: The line of the source where the error/problem was detected.
    - `repair`: How to repair, only presented when resultType is "Error".
    - `decisionPass`: The actual text message of the pass decision. Only presented when resultType is "Likely Problem" or "Potential Problem"
    - `decisionFail`: The actual text message of the fail decision. Only presented when resultType is "Likely Problem" or "Potential Problem"
    - `sequenceID`:
    - `lineNum`:
    - `lineNum`: