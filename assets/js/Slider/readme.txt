
/* html


<div class="slider">
    <div class="slide">
 <!-- img, html etc -->
    </div>
    <div class="slide">
 <!-- img, html etc -->
    </div>
    <div class="slide">
 <!-- img, html etc -->
    </div>
 </div> 

*/

/* less for .slider elements
.slider {
	width: 100%;
	height: 22em;
	background-color: rgba(1, 97, 138, 0.7);
	padding: 1em;
	&, * {box-sizing: border-box;position:relative;}
	.numbers {
		z-index: 10;
		text-align: center;
		a {
			display: inline-block;
			width: 9px;
			height: 9px;
			background-color: #b4c8d0;
			border-radius: 100%;
			border: 1px solid rgba(255, 255, 255, 0.77);
			color: transparent;
			margin: 0.15em;
			&:hover {
				background-color: #36aee3;
			}
		}
		a.active {
			background-color: #36aee3;
		}
	}
	.arrow {
		width: 24px;
		height: 34px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: #ffcc5d;
		transition: background 350ms;
		&:before {
			content: '';
			border-width: 9px 6px;
			border-style: solid;
			border-color: transparent;
			display: block;
			position: absolute;
			top: e("calc( 50% - 9px )");
			transition: background 350ms;
		}
		&:hover {
			background: #ec7e12;
		}
		&:active {
		}
		&.left {
			border-radius: 0 4px 4px 0;
			left: 0;
			&:before {
				border-right-color:#483941;
				right: e("calc( 50% - 3px )");
			}
			&:hover {
				&:before {
					border-right-color: #ffd690;
				}
			}
			&:active {
				&:before {
					border-right-color: #483941;
				}
			}
		}
		&.right {
			border-radius: 4px 0 0 4px;
			right: 0;
			&:before {
				border-left-color: #483941;
				left: e("calc( 50% - 3px )");
			}
			&:hover {
				&:before {
					border-left-color: #ffd690;
				}
			}
			&:active {
				&:before {
					border-left-color: #483941;
				}
			}
		}
	}
	.slide {
		height: inherit;
		position: absolute;
		opacity: 0;
		transition: opacity 350ms, transform 750ms;
		transform: scale(0.8, 0.8);
		text-align: center;
		z-index: 0;
		width: 100%;
		.description {
			opacity: 0;
			transition: opacity 350ms;
		}
		&.active {
			display: block;
			z-index: 2;
			opacity: 1;
			transform: scale(1,1);
			.description {
				opacity: 1;
			}
		}
		&.left, &.right {
			display: block;
			opacity: 0.5;
			z-index: 1;
		}
		&.left {
			transform: scale(0.9, 0.9) translateX(-30%);
		}
		&.right {
			transform: scale(0.9, 0.9) translateX(30%);
		}
		img {
			border: 2px solid rgba(249, 227, 179, 0.56);
//			height: 294px;
			max-height: 100%;
			max-width: 100%;
		}
	}
	.wrapper {
		width: 60%;
		margin: 0 auto;
		height: 100%;
	}
}
*/

