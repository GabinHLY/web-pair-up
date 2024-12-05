export const validateName = (name: string): string | null => {
    const maxLength = 20; 
    const forbiddenWords = ["caca", "merde", "putain", "con", "connard", "salope", "enculé", 
  "bite", "cul", "pénis", "vagin", "chienne", "filsdepute", 
  "pd", "nazi", "raciste", "hitler", "dictateur", "troll", "abruti", 
  "abrutie", "salaud", "pute", "chiant", "bordel", "nique", 
  "encule", "batard", "salaud", "pute", "satan", "fuck", "shit", 
  "bitch", "asshole", "dumb", "idiot", "fucker", "motherfucker", 
  "sex", "porn", "porno", "kill", "murder", "suicide", "terrorist", 
  "terrorism", "bomb", "massacre", "viol", "assassinat", "inceste"]; 
    const bannedUsers = ["Hitler", "AdolfHitler", "Stalin", "JosephStalin", "Mussolini", 
  "BenitoMussolini", "PolPot", "MaoZedong", "KimJongUn", 
  "KimJongIl", "Osama", "OsamaBinLaden", "Saddam", "SaddamHussein", 
  "IdiAmin", "VladTheImpaler", "PabloEscobar", "AlCapone", 
  "CharlesManson", "TedBundy", "JeffreyDahmer", "JackTheRipper", 
  "ArielCastro", "AndersBreivik", "TimothyMcVeigh", "CheGuevara", 
  "Rasputin", "GenghisKhan", "IvanTheTerrible", "FranciscoFranco", 
  "Himmler", "Goebbels", "Göring", "Eichmann", "Rohm", 
  "Milosevic", "RadovanKaradzic", "Mladic", "LeopoldII", 
  "Torquemada", "Cortez", "Zarqawi", "AlBaghdadi", "Yamamoto", 
  "Nero", "Caligula", "Attila", "Herod", "Khomeini", 
  "HoChiMinh", "KimIlSung", "Pinochet", "Trujillo", 
  "Mobutu", "HissèneHabré", "Bokassa", "Duterte"]; 
    

    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  
    if (name.length > maxLength) {
      return `Name is too long. Maximum length is ${maxLength} characters.`;
    }
  
    if (forbiddenWords.some((word) => sanitizedName.includes(word))) {
      return "Name contains inappropriate language.";
    }
  
    if (bannedUsers.includes(sanitizedName)) {
      return "This user is not allowed.";
    }
  
    return null; 
  };
  