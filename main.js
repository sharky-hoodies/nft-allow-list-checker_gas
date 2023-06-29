function doGet(e) {
    const template = HtmlService.createTemplateFromFile('index');
    template.deployURL = ScriptApp.getService().getUrl();
    template.color = "dark";
    template.display = "none";
    template.message = '';
    template.inputWallet = '';
  
    if (e.parameter.input) {
      const input = e.parameter.input;
      template.inputWallet = input;
  
      // 検索するシートを取得
      const sheet = SpreadsheetApp.getActive().getSheetByName("AllowList");
  
      // ウォレットアドレスがシートに存在するかどうかチェック
      // NOTE: ウォレットアドレスは大文字小文字の区別をつけないので注意
      let exists = sheet.createTextFinder(input).matchEntireCell(true).findAll();
      if (exists.length > 0) {
        template.color = "info";
        template.display = "block";
        template.message = `RESULT:: AllowListにあります！！ミント日をお楽しみに！！`;
      } else {
        template.color = "danger";
        template.display = "block";
        template.message = `RESULT:: 入力したウォレットアドレスは、AllowListにありません`;
      }
    }
  
    const htmlOutput = template.evaluate();
    return htmlOutput;
  }