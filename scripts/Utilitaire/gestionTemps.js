const jourS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
let auj = new Date();
let options = {weekday: 'long'};
let jourActu = auj.toLocaleDateString('fr-FR', options);

jourActu = jourActu.charAt(0).toUpperCase() + jourActu.slice(1);

let tabJourEnOrdre = jourS.slice(jourS.indexOf(jourActu)).concat(jourS.slice(0, jourS.indexOf(jourActu)));
console.log(tabJourEnOrdre);

export default tabJourEnOrdre;