document.addEventListener('DOMContentLoaded', () => {
    // IDs de los contenedores
    const containerIds = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6'];

    // Array con la información de cada modelo, su textura, datos informativos y configuración de cámara
    const models = [
        {
            gltfPath: '/models/MARIPOSA/Untitled.gltf',
            texturePath: '../models/MARIPOSA/ButterflyTexture.jpg',
            info: 'Información del modelo 1: Este modelo representa una mariposa con texturas personalizadas.',
            cameraPosition: { x: -1, y: 0, z: 4 },
            cameraTarget: { x: 0, y: 1, z: 0 }
        },
        {
            gltfPath: '/models/MARIPOSA_AZUL/butterfly.gltf',
            texturePath: '../models/OTHER_MODEL/BackWingCol.png',
            info: 'Información del modelo 2: Este es otro modelo de ejemplo.',
            cameraPosition: { x: 0, y: 0, z: 0 },
            cameraTarget: { x: 0, y: 1, z: 0 }
        },
        {
            gltfPath: '/models/MARIPOSA_TRES/MARIPOSA 3.gltf',
            texturePath: '../models/ANOTHER_MODEL/NOMBREDELATEXTURA...',
            info: 'Información del modelo 3: Modelo alternativo con otra textura.',
            cameraPosition: { x: 0, y: 0, z: 4 },
            cameraTarget: { x: 0, y: 1, z: 0 }
        },
        {
            gltfPath: '/models/FOURTH_MODEL/model.gltf',
            texturePath: '../models/FOURTH_MODEL/modelTexture.jpg',
            info: 'Información del modelo 4: Cuarto modelo en la galería.',
            cameraPosition: { x: 0, y: 2, z: 7 },
            cameraTarget: { x: 0, y: 0, z: 0 }
        },
        {
            gltfPath: '/models/FOURTH_MODEL/model.gltf',
            texturePath: '../models/FOURTH_MODEL/modelTexture.jpg',
            info: 'Información del modelo 4: Cuarto modelo en la galería.',
            cameraPosition: { x: 0, y: 2, z: 7 },
            cameraTarget: { x: 0, y: 0, z: 0 }
        },
        {
            gltfPath: '/models/FOURTH_MODEL/model.gltf',
            texturePath: '../models/FOURTH_MODEL/modelTexture.jpg',
            info: 'Información del modelo 4: Cuarto modelo en la galería.',
            cameraPosition: { x: 0, y: 2, z: 7 },
            cameraTarget: { x: 0, y: 0, z: 0 }
        }
    ];

    // Para cada contenedor se inicializa una escena con su modelo correspondiente
    containerIds.forEach((id, index) => initScene(id, models[index]));

    function initScene(containerId, modelData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Asegurarse de que el contenedor tenga posición relativa para ubicar elementos hijos (botón y modal)
        container.style.position = 'relative';

        // Crear la escena y establecer un fondo
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf3ffd6);

        // Agregar luces sutiles
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Cámara con configuración inicial personalizada
        const camera = new THREE.PerspectiveCamera(
            80,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        if (modelData.cameraPosition) {
            camera.position.set(
                modelData.cameraPosition.x,
                modelData.cameraPosition.y,
                modelData.cameraPosition.z
            );
        } else {
            camera.position.set(0, 1.5, 5);
        }

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            outputEncoding: THREE.sRGBEncoding
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Controles
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        // Configurar el objetivo de la cámara, si se especifica
        if (modelData.cameraTarget) {
            controls.target.set(
                modelData.cameraTarget.x,
                modelData.cameraTarget.y,
                modelData.cameraTarget.z
            );
        }
        controls.update();

        // Crear el botón para desplegar la información
        const infoButton = document.createElement('button');
        infoButton.textContent = 'Info';
        infoButton.style.position = 'absolute';
        infoButton.style.top = '10px';
        infoButton.style.right = '10px';
        infoButton.style.padding = '8px 12px';
        infoButton.style.backgroundColor = '#fff';
        infoButton.style.border = '1px solid #ccc';
        infoButton.style.borderRadius = '4px';
        infoButton.style.cursor = 'pointer';
        infoButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        infoButton.style.fontFamily = 'Arial, sans-serif';
        infoButton.style.fontSize = '14px';
        container.appendChild(infoButton);

        // Crear el modal para mostrar la información
        const modal = document.createElement('div');
        modal.style.position = 'absolute';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.color = '#fff';
        modal.style.padding = '20px';
        modal.style.boxSizing = 'border-box';
        modal.style.zIndex = '100';
        modal.style.visibility = 'hidden'; // Oculto por defecto

        // Contenido interno del modal con botón de cierre
        modal.innerHTML = `
            <div style="background: #333; padding: 20px; border-radius: 8px; position: relative; max-width: 90%; max-height: 90%; overflow-y: auto;">
                <span style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px;" id="modal-close">&times;</span>
                <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">${modelData.info}</p>
            </div>
        `;
        container.appendChild(modal);

        // Mostrar el modal al hacer clic en el botón
        infoButton.addEventListener('click', () => {
            modal.style.visibility = 'visible';
        });

        // Cerrar el modal al hacer clic en el botón de cierre
        modal.querySelector('#modal-close').addEventListener('click', () => {
            modal.style.visibility = 'hidden';
        });

        // Cargar el modelo glTF y aplicar la textura a sus materiales
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        const modelTexture = textureLoader.load(modelData.texturePath);

        loader.load(
            modelData.gltfPath,
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(mat => {
                                mat.map = modelTexture;
                                mat.needsUpdate = true;
                            });
                        } else {
                            child.material.map = modelTexture;
                            child.material.needsUpdate = true;
                        }
                    }
                });
                // Posicionar el modelo según lo requieras
                model.position.set(0, 0, 0);
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Error loading glTF:', error);
            }
        );

        // Ajuste de tamaño al redimensionar la ventana
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }
});