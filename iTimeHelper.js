/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ---																																						--- **
/** --- 															------------------------															--- **
/** ---																{ iTimeHelpers.js }																--- **
/** --- 															------------------------															--- **
/** ---																																						--- **
/** ---		AUTEUR 	: Nicolas DUPRE																												--- **
/** ---																																						--- **
/** ---		RELEASE	: 20.10.2016																													--- **
/** ---																																						--- **
/** ---		VERSION	: 1.3 NDU																														--- **
/** ---																																						--- **
/** ---																																						--- **
/** --- 														-----------------------------															--- **
/** --- 															 { C H A N G E L O G } 																--- **
/** --- 														-----------------------------															--- **
/** ---																																						--- **
/** ---		VERSION 1.3 : 20.10.2016 : NDU																										--- **
/** ---		------------------------------																										--- **
/** ---			- Remplacement du la greffe par notation pointée par la méthode addEventListener									--- **
/** ---				>  Création de la fonction iTimeHelper_init																				--- **
/** ---																																						--- **
/** ---			- Modification du process de déclenchement de l'evenement onchange													--- **
/** ---				> Utilisation de l'objet Event  + dispatchEvent																			--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		VERSION 1.2 : 09.01.2016																												--- **
/** ---		------------------------																												--- **
/** ---			- Prise en charge des valeurs numérique en guise de boolean																--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		VERSION 1.1 : 26.07.2015																												--- **
/** ---		------------------------																												--- **
/** ---			- Amélioration du script existant :																								--- **
/** ---				> Suppression du conflit entre l'autocomplétion et de la suppresion du caractère autocomplété			--- **
/** ---				> Configuration du comportement par des attribut de configuration													--- **
/** ---				> Configuration automatique du pattern si demandé ou non spécifié si required									--- **
/** ---				> Création du système "Toujours vrai" (never-wrong) qui corrige le champ si laissé faux					--- **
/** ---					> Idéal pour un système de filtre dynamique ou champ de recherche												--- **
/** ---																																						--- **
/** --- 											-----------------------------------------------------										--- **
/** --- 												{ L I S T E      D E S      M E T H O D E S } 											--- **
/** --- 											-----------------------------------------------------										--- **
/** ---																																						--- **
/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **

	Objectif de la fonction :
	-------------------------
		
	Description fonctionnelle :
	---------------------------

	<input
	
		type="iTime"
		
		clock-sep=":"
		sep-auto="true|false"
		pattern-auto="true|false"
		octm-flush="true|false"
		never-wrong="true|false"
		never-value="hhsmm"
		
		
		placeholder=""
		value=""
	
	/>
	
	clock-sep		:: Séparateur des heures et minutes - Par défaut : ":"
	sep-auto 		:: Autocomplétion  du séparateur HH et MM - Par défaut : true
	pattern-auto	:: Ajout automatique du pattern de l'heure pour les cas "required" - Par défaut : true
	octm-flush		:: oncontextmenu (Right Click) vide le champs : Par défaut : true
	never-wrong		:: Indique si le champs s'auto-corrige par la valeur never-value lorsque le pattern n'est pas bon - Par défaut : false
	never-value		:: Valeur à appliquer lorsque c'est faux	
	
	Si required et pas de pattern, alors auto-pattern
	
	Si never-wrong = true && never-value = void alors console.error
	Si never-wrong = true && value not exist then create attribute
	Si never-wrong = true && placeholder not exist then create attribute

/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **/
/** Fonction de purge du champ **/
function iTimeHelper_reset(target, e){
	target.value="";
	e.preventDefault();
}

/** Fonction de complétion automatique **/
function iTimeHelper_autocomplete(target, e){
	var clock_sep = (target.getAttribute('clock-sep') !== null) ? target.getAttribute('clock-sep') : ':';
	var keyCode = e.keyCode | e.charCode;
	var preventKeyCode = [8, 46]; //backspace / delete
	
	if(preventKeyCode.lastIndexOf(keyCode) === -1){
		var pattern_to_append_sep = new RegExp('^[0-9]{2}$', 'gi');
		
		if(pattern_to_append_sep.test(target.value)){
			target.value += clock_sep;
		}	
	}
}

/** Fonction de correction automatique **/
function iTimeHelper_autocorrect(target, pattern, never_value){
	pattern = new RegExp(pattern, 'i');
	
	if(!pattern.test(target.value)){
		target.value = never_value;
		
		/** Si changement effectué, alors il faut invoquer le changement **/
		// Create a new 'change' event
		var event = new Event('change');
		
		// Dispatch it.
		target.dispatchEvent(event);
	}
}

/** Moteur de conversion automatique des champs de type iTime une fois la page chargée **/
function iTimeHelper_init(){
	if(document.readyState === 'complete'){
		/** Récupérer tout les boutons de type iTime **/
		var iTime_buttons = document.querySelectorAll('[type=iTime]');
			
		/** Parcourir les boutons trouvé **/
		for(var i = 0; i < iTime_buttons.length; i++){
			/** Adapter le type pour plus de standart **/
			iTime_buttons[i].setAttribute('type', 'text');
			
			
			/** Récupération des attributs **/
			var clock_sep = (iTime_buttons[i].getAttribute('clock-sep') !== null) ? iTime_buttons[i].getAttribute('clock-sep') : ':';
			
			var sep_auto = iTime_buttons[i].getAttribute('sep-auto');
				sep_auto = (sep_auto === null || sep_auto === 'true' || parseInt(sep_auto) > 0) ? true : false;
			
			var pattern_auto = iTime_buttons[i].getAttribute('pattern-auto');
				pattern_auto = (pattern_auto === null || pattern_auto === 'true' || parseInt(pattern_auto) > 0) ? true : false;
			
			var never_wrong = iTime_buttons[i].getAttribute('never-wrong');
				never_wrong = (never_wrong === 'true' || parseInt(never_wrong) > 0) ? true : false;
			
			var octm_flush = iTime_buttons[i].getAttribute('octm-flush');
				octm_flush = (octm_flush === null || octm_flush === 'true' || parseInt(octm_flush) > 0) ? true : false;
			
			var never_value = (iTime_buttons[i].getAttribute('never-value') !== null) ? iTime_buttons[i].getAttribute('never-value') : ('00'+clock_sep+'00');
			
			
			/** Application du pattern lorsque nécessaire ou spécifié **/
			if(!pattern_auto && iTime_buttons[i].getAttribute('required') !== null && iTime_buttons[i].getAttribute('pattern') === null){
				pattern_auto = true;
			}
			
			if(pattern_auto){
				iTime_buttons[i].setAttribute('pattern', '^([0-1][0-9]|[2][0-3])['+clock_sep+'][0-5][0-9]$');
			}
			
			
			/** Appliquer la fonction de nettoyage au oncontextemenu **/
			if(octm_flush){
				iTime_buttons[i].addEventListener('contextmenu', iTimeHelper_reset.bind(this, iTime_buttons[i]));
				if(iTime_buttons[i].title === ''){
					iTime_buttons[i].title = 'Clic droit pour effacer';
				} else {
					iTime_buttons[i].title += "\nClic droit pour effacer";
				}
			}
			
			
			/** Appliquer la fonction de complétion du séparateur **/
			if(sep_auto){
				iTime_buttons[i].addEventListener('keyup', iTimeHelper_autocomplete.bind(this, iTime_buttons[i]));
				if(iTime_buttons[i].title === ''){
					iTime_buttons[i].title = 'Champ autocomplété';
				} else {
					iTime_buttons[i].title += "\nChamp autocomplété";
				}
			}
			
			
			/** Appliquer la fonction de correction lorsque le champ doit etre toujours juste **/
			if(never_wrong){
				/** Si placeholder not exist, appliquer la never-value **/
				if(iTime_buttons[i].getAttribute('placeholder') === null){
					iTime_buttons[i].setAttribute('placeholder', never_value);
				}
				
				/** Si value not exist appliquer la never_value **/
				if(iTime_buttons[i].getAttribute('value') === null){
					iTime_buttons[i].setAttribute('value', never_value);
				}
				
				/** Selection du pattern : Si défini utiliser celui défini par le user **/
				var pattern = (iTime_buttons[i].getAttribute('pattern') === null) ? '^([0-1][0-9]|[2][0-3])['+clock_sep+'][0-5][0-9]$' : iTime_buttons[i].getAttribute('pattern');
				
				/** Fonction de correction sur la perte de focus **/
				iTime_buttons[i].addEventListener('blur', iTimeHelper_autocorrect.bind(this, iTime_buttons[i], pattern, never_value));
			}
		}
	}
}

document.addEventListener('readystatechange', iTimeHelper_init);
