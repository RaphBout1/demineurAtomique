# demineurAtomique

##Règle du jeu :
Cinq boules(atomes) sont placées secrètement sur un damier de 8×8 cases. On ne
voit pas ces boules sur le plateau, le but du joueur est de découvrir où se situent ces
boules en le moins de coups possible. Un coup consiste à envoyer un rayon X
imaginaire à partir d’une des 32 cases d’entrée et de voir par où il sortira. S’il touche
une boule, il ne sort pas du damier. S’il frôle une boule par un des coins, il sera dévié
à angle droit. S’il ne touche ou ne frôle rien, il ressort tout simplement par l’autre
côté. Le joueur place alors des pions sur grilles aux endroits supposés des atomes et
valide son choix!

![Capture d’écran 2022-03-19 200742](https://user-images.githubusercontent.com/91502674/159135206-a425e6db-10dc-46a7-904d-f104d2f79b25.png)


Ainsi, les rayons X peuvent se comporter essentiellement de quatre façons :
• Ils peuvent traverser le jeu sans être modifiés dans leur chemin rectiligne s'ils ne
passent pas près d'un atome.
• Ils peuvent être déviés de 90º s'ils passent près d'un atome
• Ils peuvent être absorbés et ne pas émerger s'ils rencontrent un atome directement
(aussi s'ils l'atteignent après avoir été détournés précédemment).
• Et ils peuvent être reflétés juste avant d'entrer par un carré adjacent à un occupé.


![Capture d’écran 2022-03-19 200911](https://user-images.githubusercontent.com/91502674/159135135-97fa217f-9c09-407d-a365-3152e6c85ddf.png)

![Capture d’écran 2022-03-19 201107](https://user-images.githubusercontent.com/91502674/159135178-fae4eec2-2c13-4d47-8332-a44e07563db6.png)
