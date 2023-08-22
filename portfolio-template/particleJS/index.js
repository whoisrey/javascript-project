const particleOptions = {
  particles: {
    number: {
      value: 15, // 파티클 갯수
      density: {
        enable: true,
        value_area: 300, // 파티클이 나뉘는 지역
      },
    },

    color: {
      value: "#ffffff", // 파티클 색상
    },
    shape: {
      type: "triangle", // 파티클 모양
    },
    opacity: {
      value: 0.8, // 파티클 투명도
      random: true,
      anum: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5, // 파티클 사이즈
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },

    // 연결선
    line_linked: {
      enable: true,
      distance: 150, // 파티클 사이의 최대 거리
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },

    // 움직임
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce", // 파티클의 움직임
      bounce: false,
    },
  },
  // 반응형 세팅
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true, // hover 했을 때
        mode: "repulse",
      },
      onclick: {
        enable: true, // click 했을 때
        mode: "push", //
      },
      resize: true, // resize
    },
  },

  retina_detect: true,
};

const particleJSInstance = particlesJS("background", particleOptions);

// 파티클 색상 변경 함수
function changeParticleColor(newColor) {
  particleOptions.particles.color.value = newColor;
  particlesJS("background", particleOptions);
}

// 파티클 색상 변경 버튼 클릭 이벤트 리스너 등록
const changeColorButton = document.getElementById("change-color-button");
changeColorButton.addEventListener("click", () => {
  const newColor = getRandomColor(); // 무작위 색상 생성 함수 호출
  changeParticleColor(newColor);
});

// 무작위 색상 생성 함수
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
