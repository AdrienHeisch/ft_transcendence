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
				Conditions Générales d'Utilisation
			</h1>
			
			<div class="text-gray-700 space-y-6">
				<p class="text-sm text-gray-500 italic">
					Dernière mise à jour : 17 janvier 2026
				</p>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">1. Acceptation des Conditions</h2>
					<p>
						En accédant et en utilisant La Ferme à Bibi, vous acceptez d'être lié par les présentes Conditions 
						Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">2. Description du Service</h2>
					<p>
						La Ferme à Bibi est une plateforme sociale dédiée aux animaux de ferme, permettant aux utilisateurs 
						de créer des profils, partager du contenu, interagir avec d'autres membres, et faciliter les adoptions 
						d'animaux. Le service est fourni "tel quel" et nous nous réservons le droit de le modifier ou de 
						l'interrompre à tout moment.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">3. Création de Compte</h2>
					<p class="mb-2">Pour utiliser notre service, vous devez :</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Avoir au moins 13 ans</li>
						<li>Fournir des informations exactes et à jour</li>
						<li>Maintenir la sécurité de votre compte et mot de passe</li>
						<li>Nous informer immédiatement de toute utilisation non autorisée</li>
						<li>Ne pas créer de comptes multiples ou usurper l'identité d'autrui</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">4. Règles de Conduite</h2>
					<p class="mb-2">Vous vous engagez à ne pas :</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Publier de contenu illégal, offensant, diffamatoire ou haineux</li>
						<li>Harceler, intimider ou menacer d'autres utilisateurs</li>
						<li>Partager du contenu violent ou abusif envers les animaux</li>
						<li>Usurper l'identité d'une autre personne ou entité</li>
						<li>Spammer ou envoyer des messages non sollicités</li>
						<li>Tenter d'accéder de manière non autorisée au système</li>
						<li>Utiliser des bots ou des scripts automatisés</li>
						<li>Collecter des données d'utilisateurs sans autorisation</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">5. Contenu Utilisateur</h2>
					<p class="mb-2">
						En publiant du contenu sur La Ferme à Bibi, vous :
					</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Conservez tous vos droits de propriété intellectuelle</li>
						<li>Nous accordez une licence mondiale, non exclusive et gratuite d'utiliser, afficher et distribuer votre contenu</li>
						<li>Garantissez que vous avez le droit de publier ce contenu</li>
						<li>Acceptez que nous puissions modérer ou supprimer du contenu inapproprié</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">6. Adoptions</h2>
					<p>
						La Ferme à Bibi facilite les connexions pour les adoptions d'animaux mais n'est pas responsable des 
						transactions entre utilisateurs. Toute adoption doit respecter les lois locales. Nous recommandons 
						fortement de rencontrer les animaux en personne et de vérifier les conditions d'adoption avant de 
						s'engager.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">7. Propriété Intellectuelle</h2>
					<p>
						Tous les éléments du site (logo, design, code, textes) sont protégés par des droits d'auteur et 
						appartiennent à La Ferme à Bibi ou à ses concédants de licence. Vous ne pouvez pas copier, modifier 
						ou distribuer ces éléments sans autorisation écrite préalable.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">8. Limitation de Responsabilité</h2>
					<p>
						La Ferme à Bibi ne peut être tenue responsable des dommages directs, indirects, accessoires ou 
						consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le service. Nous ne garantissons 
						pas que le service sera ininterrompu, sécurisé ou exempt d'erreurs.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">9. Suspension et Résiliation</h2>
					<p class="mb-2">
						Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment, sans préavis, 
						notamment en cas de :
					</p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Violation des présentes conditions</li>
						<li>Comportement inapproprié ou nuisible</li>
						<li>Inactivité prolongée</li>
						<li>Demande de votre part</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">10. Modifications des Conditions</h2>
					<p>
						Nous pouvons modifier ces conditions à tout moment. Les modifications prendront effet dès leur 
						publication sur cette page. Votre utilisation continue du service après modification constitue 
						votre acceptation des nouvelles conditions.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">11. Droit Applicable</h2>
					<p>
						Ces conditions sont régies par le droit français. Tout litige sera soumis à la compétence exclusive 
						des tribunaux français.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">12. Contact</h2>
					<p>
						Pour toute question concernant ces conditions générales d'utilisation, contactez-nous à : 
						<a href="mailto:legal@lafermeabibi.com" class="text-orange-600 hover:text-orange-800 underline">legal@lafermeabibi.com</a>
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-bold text-orange-800 mb-3">13. Dispositions Diverses</h2>
					<p>
						Si une disposition de ces conditions est jugée invalide ou inapplicable, les autres dispositions 
						resteront en vigueur. Le fait de ne pas exercer un droit ne constitue pas une renonciation à ce droit.
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
