function QQVersionBean(versions, versionNumber, size, featureTitle, imgs, summary, jsonString, displayType = 0) {
  this.versions = versions;
  this.versionNumber = versionNumber;
  this.size = size;
  this.featureTitle = featureTitle;
  this.imgs = imgs;
  this.summary = summary;
  this.jsonString = jsonString;
  this.displayType = displayType; // 0为收起
}

module.exports = QQVersionBean;