AutoForm.addInputType("select-multiple", {
  template: "afSelectMultiple",
  valueIsArray: true,
  valueOut: function () {
    return Utility.getSelectValues(this[0]);
  },
  contextAdjust: function (context) {
    // build items list
    context.items = _.map(context.selectOptions, function(opt) {
      return {
        name: context.name,
        label: opt.label,
        value: opt.value,
        // _id must be included because it is a special property that
        // #each uses to track unique list items when adding and removing them
        // See https://github.com/meteor/meteor/issues/2174
        _id: opt.value,
        selected: _.contains(context.value, opt.value.toString()),
        atts: context.atts
      };
    });

    return context;
  }
});

Template["afSelectMultiple"].helpers({
  optionAtts: function afSelectOptionAtts() {
    var item = this
    var atts = {
      value: item.value
    };
    if (item.selected) {
      atts.selected = "";
    }
    return atts;
  }
});