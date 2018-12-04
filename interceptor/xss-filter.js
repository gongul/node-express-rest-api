const xssFilters = require('xss-filters');
const commentFilter = (req,res,next) => {
  if(req.method !== 'POST'){
    return next(); 
  }
  
  const {name,contents} = req.body;
  
  req.body.name = xssFilters.inHTMLData(name);
  req.body.contents = xssFilters.inHTMLData(contents);
  
  next();
}

exports.commentFilter = commentFilter;