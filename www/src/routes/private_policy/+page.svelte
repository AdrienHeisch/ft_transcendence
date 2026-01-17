<script lang="ts">
	// Svelte 5 ready - no state needed for this static page
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
	<!-- Header -->
	<header class="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
		<div class="flex items-center justify-between px-6 py-3">
			<button
				onclick={() => (window.location.href = '/')}
				class="flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
			>
				<span class="text-xl">🏠</span>
				<span>Accueil</span>
			</button>

			<div class="flex items-center gap-3">
				<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐄%3C/text%3E%3C/svg%3E" alt="Logo" class="w-10 h-10" />
				<div>
					<h1 class="text-3xl font-bold text-yellow-100" style="font-family: Georgia, serif;">La Ferme à Bibi</h1>
					<p class="text-sm text-yellow-200 italic" style="font-family: Georgia, serif;">Depuis 1887</p>
				</div>
			</div>

			<div class="w-32"></div>
		</div>
	</header>

	<!-- Contenu -->
	<main class="max-w-4xl mx-auto p-8">
		<div class="bg-white rounded-xl shadow-lg border-3 border-orange-400 p-8">
			<h1 class="text-4xl font-bold text-orange-900 mb-6" style="font-family: Georgia, serif;">
				Politique de Confidentialité
			</h1>
			
			<div class="text-gray-700 space-y-6">
				<p class="text-sm text-gray-500 italic">
					Dernière mise à jour : 17 janvier 2026
				</p>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">1. Introduction</h2>
					<p>
						Bienvenue sur La Ferme à Bibi. Nous nous engageons à protéger votre vie privée et vos données personnelles. 
						Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">2. Données Collectées</h2>
					<p class="mb-2">Nous collectons les types de données suivants :</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Informations de profil (nom, email, photo de profil)</li>
						<li>Données adoptants et associations (historique d'adoptions, préférences)</li>
						<li>Messages et communications entre utilisateurs</li>
						<li>Photos et contenus partagés</li>
						<li>Informations de connexion (date, heure, adresse IP)</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">3. Utilisation des Données</h2>
					<p class="mb-2">Vos données sont utilisées pour :</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Fournir et améliorer nos services</li>
						<li>Personnaliser votre expérience</li>
						<li>Faciliter les interactions sociales et les adoptions</li>
						<li>Assurer la sécurité et prévenir les abus</li>
						<li>Vous envoyer des notifications importantes</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">4. Partage des Données</h2>
					<p>
						Nous ne vendons jamais vos données personnelles. Vos informations peuvent être partagées avec d'autres 
						utilisateurs uniquement dans le cadre des fonctionnalités sociales du site (profil public, messages, 
						annonces d'adoption). Nous pouvons partager des données anonymisées à des fins statistiques.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">5. Sécurité des Données</h2>
					<p>
						Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données 
						contre tout accès non autorisé, modification, divulgation ou destruction. Toutes les communications sont 
						chiffrées et les données sensibles sont stockées de manière sécurisée.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">6. Vos Droits</h2>
					<p class="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Droit d'accès à vos données personnelles</li>
						<li>Droit de rectification de vos données</li>
						<li>Droit à l'effacement (droit à l'oubli)</li>
						<li>Droit à la portabilité de vos données</li>
						<li>Droit d'opposition au traitement</li>
						<li>Droit de retirer votre consentement</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">7. Cookies</h2>
					<p>
						Nous utilisons des cookies essentiels pour le fonctionnement du site (authentification, préférences). 
						Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">8. Conservation des Données</h2>
					<p>
						Nous conservons vos données aussi longtemps que votre compte est actif. Si vous supprimez votre compte, 
						vos données seront effacées dans un délai de 30 jours, sauf obligation légale de conservation.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">9. Mineurs</h2>
					<p>
						Notre service n'est pas destiné aux personnes de moins de 13 ans. Si nous découvrons qu'un mineur a 
						fourni des données personnelles, nous les supprimerons immédiatement.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">10. Contact</h2>
					<p>
						Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
						contactez-nous à : <a href="mailto:privacy@lafermeabibi.com" class="text-orange-600 hover:text-orange-800 underline">privacy@lafermeabibi.com</a>
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">11. Modifications</h2>
					<p>
						Nous nous réservons le droit de modifier cette politique de confidentialité. Toute modification sera 
						publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement 
						cette page.
					</p>
				</section>
			</div>

			<div class="mt-8 pt-6 border-t-2 border-orange-300">
				<button
					onclick={() => (window.location.href = '/')}
					class="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md"
				>
					← Retour à l'accueil
				</button>
			</div>
		</div>
	</main>
</div>
