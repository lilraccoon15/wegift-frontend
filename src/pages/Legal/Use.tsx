const Use = () => {
  // TODO : acceptation des cookies
  // todo : rester connecté
  return (
    <>
      <h1>Politique de Confidentialité (RGPD)</h1>

      <p>Dernière mise à jour : 26 août 2025</p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est [Lefort Camille], joignable
        à : [contact@wegift.fr]
      </p>

      <h2>2. Données collectées</h2>
      <p>Lors de l’utilisation de l’Application, nous collectons :</p>
      <ul>
        <li>
          Données de compte : pseudo, date de naissance, email, mot de passe
          (chiffré).
        </li>
        <li>
          Données d’usage : historique des wishlists, échanges, et interactions.
        </li>
        <li>
          Données techniques : logs de connexion, adresse IP (à des fins de
          sécurité).
        </li>
        <li>
          Données optionnelles : photo de profil, préférences de notifications.
        </li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Les données sont utilisées pour :</p>
      <ul>
        <li>Fournir les services de l’Application.</li>
        <li>Assurer la sécurité des comptes et des données.</li>
        <li>Améliorer l’expérience utilisateur.</li>
        <li>
          Envoyer des communications (emails transactionnels ou newsletters si
          consentement).
        </li>
      </ul>

      <h2>4. Bases légales</h2>
      <ul>
        <li>
          Exécution du contrat (gestion du compte, fourniture des services)
        </li>
        <li>Consentement (newsletter, cookies)</li>
        <li>
          Obligation légale (conservation des données liées à la sécurité)
        </li>
        <li>
          Intérêt légitime (prévention de fraude, amélioration du service)
        </li>
      </ul>

      <h2>5. Partage des données</h2>
      <p>Les données peuvent être partagées uniquement avec :</p>
      <ul>
        <li>
          Les prestataires techniques indispensables au service (hébergement
          Railway, stockage Cloudinary, etc.).
        </li>
        <li>Les autorités compétentes en cas d’obligation légale.</li>
      </ul>
      <p>Aucune donnée n’est vendue ni louée à des tiers.</p>

      <h2>6. Durée de conservation</h2>
      <ul>
        <li>
          Données de compte : tant que le compte est actif, puis suppression
          dans les 12 mois suivant la fermeture.
        </li>
        <li>Logs techniques : 12 mois maximum.</li>
        <li>Données de newsletter : jusqu’au retrait du consentement.</li>
      </ul>

      <h2>7. Sécurité</h2>
      <p>
        Nous mettons en place des mesures techniques et organisationnelles pour
        protéger vos données, telles que :
      </p>
      <ul>
        <li>Chiffrement des mots de passe.</li>
        <li>Utilisation de connexions sécurisées (HTTPS).</li>
        <li>Contrôles d’accès aux serveurs.</li>
      </ul>

      <h2>8. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Accéder à vos données.</li>

        <li>Rectifier ou mettre à jour vos données.</li>

        <li>Demander la suppression de votre compte.</li>

        <li>Retirer votre consentement à tout moment.</li>

        <li>Demander la portabilité de vos données.</li>
      </ul>

      <h2>9. Cookies</h2>
      <p>L’Application utilise des cookies pour :</p>
      <ul>
        <li>Assurer le fonctionnement technique.</li>
        <li>Analyser l’audience (statistiques anonymisées).</li>
      </ul>
      <p>Vous pouvez configurer vos préférences dans votre navigateur.</p>

      <h2>10. Modifications</h2>
      <p>Nous pouvons mettre à jour cette Politique de Confidentialité.</p>
      <p>
        Les utilisateurs seront informés par notification dans l’Application ou
        par email.
      </p>

      <h2>11. Contact</h2>
      <p>Pour toute question relative à vos données :</p>
      <p>Email : contact@wegift.fr</p>
    </>
  );
};

export default Use;
