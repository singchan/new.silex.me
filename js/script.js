
        ////////////////////////////////////
        // github issues
        ////////////////////////////////////
        function silex_github_widget(containerSelector, labels, imageMode, cbk){
            var labelsStr = '';
            // for(var idx=0; idx<labels.length; idx++) labelsStr += '%20label%3A' + labels[idx];
            // build url like https://api.github.com/repos/silexlabs/Silex/issues?labels=widget
            //var githubUrl = 'https://api.github.com/repos/silexlabs/Silex/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen' + labelsStr + '&callback=?';
            var githubUrl = 'https://api.github.com/repos/silexlabs/Silex/issues?state=open&per_page=50&callback=?';
            $.getJSON(githubUrl, function (data) {
              data = data.data;
              var listHtml = '<ul>';
              for (issueIndex in data){
                var issue = data[issueIndex];
                if(typeof(issue) != 'object') continue; // case of IE? And when an error occured (e.g. API rate limit exceeded)
                var hasTag = false;
                for(var idx1=0; idx1<issue.labels.length; idx1++)
                    for(var idx2=0; idx2<labels.length; idx2++) 
                        if(issue.labels[idx1].name === labels[idx2]) {
                            hasTag = true;
                            break;
                        }
                if(hasTag) {
                    var issueHtml = "<li>";
                    issueHtml += '<a target="_blank" href' + '="';
                    issueHtml += issue.html_url;
                    issueHtml += '">';
                    if (imageMode){
                      var re = /(https?:\/\/\S+\.(?:jpg|png|gif|jpg<.|png<.|gif<.))/i;
                      var imageUrlArray = issue.body.match(re);
                      if (imageUrlArray && imageUrlArray.length > 0){
                        var firstImageUrl = imageUrlArray[0];
                        issueHtml += '<img ' + 'src' + '="' + firstImageUrl + '" alt="' + issue.title + '" title="' + issue.title + '" />';
                        issueHtml += '<p>' + issue.title + '</p>';
                      }
                    }
                    else{
                      issueHtml += issue.title;
                    }
                    issueHtml += "</a>";
                    issueHtml += "</li>";
                    listHtml += issueHtml;
                }
              }
              listHtml += '</ul>';
              $(containerSelector+' p.loading').remove();
              $(containerSelector).append(listHtml);
              if(cbk) cbk();
            });
        }
    