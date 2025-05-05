const irregularPlurals = {
    child: "children",
    person: "people",
    man: "men",
    woman: "women",
    tooth: "teeth",
    foot: "feet",
    mouse: "mice",
    goose: "geese",
    leaf: "leaves",
    wolf: "wolves",
    calf: "calves",
    knife: "knives",
    life: "lives",
    wife: "wives",
    cactus: "cacti",
    focus: "foci",
    fungus: "fungi",
    radius: "radii",
    alumnus: "alumni",
    activity: "Activities",
  };
  
  const pluralize = (count, singular, plural = "") => {
    // Kiểm tra nếu từ bất quy tắc có trong từ điển
    if (irregularPlurals[singular.toLowerCase()]) {
      return count === 1 ? singular : irregularPlurals[singular.toLowerCase()];
    }
  
    // Nếu không có plural, tự động thêm "s" hoặc "es"
    if (!plural) {
      if (singular.endsWith("s") || singular.endsWith("x") || singular.endsWith("z") || singular.endsWith("ch") || singular.endsWith("sh")) {
        plural = singular + "es";
      } else {
        plural = singular + "s";
      }
    }
  
    return count === 1 ? singular : plural;
  };
  
  export default pluralize;
  